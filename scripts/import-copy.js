import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const PAGES_DIR = './src/pages';
const INPUT_FILE = './website-copy-edited.csv';
const BACKUP_DIR = './backups';

// Create backup directory if it doesn't exist
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR);
}

// Helper to create backup of original files
function backupFile(filePath) {
  const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
  const fileName = path.basename(filePath);
  const backupPath = path.join(BACKUP_DIR, `${fileName}.${timestamp}.backup`);
  fs.copyFileSync(filePath, backupPath);
  return backupPath;
}

// Helper to update text in file
function updateFileContent(filePath, updates) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let changeCount = 0;
  
  // Sort updates by length of original text (longest first) to avoid replacement conflicts
  updates.sort((a, b) => b.originalText.length - a.originalText.length);
  
  for (const update of updates) {
    const { originalText, newText, element } = update;
    
    // Handle attribute updates
    if (element.startsWith('@')) {
      const attr = element.substring(1);
      const regex = new RegExp(`(${attr}=")${escapeRegex(originalText)}(")`);
      if (content.match(regex)) {
        content = content.replace(regex, `$1${newText}$2`);
        changeCount++;
      }
    } else {
      // Handle element content updates
      // Try to find exact match first
      if (content.includes(originalText)) {
        content = content.replace(originalText, newText);
        changeCount++;
      } else {
        // If no exact match, try with normalized whitespace
        const normalizedOriginal = originalText.replace(/\s+/g, ' ').trim();
        const normalizedNew = newText.replace(/\s+/g, ' ').trim();
        const contentNormalized = content.replace(/\s+/g, ' ');
        
        if (contentNormalized.includes(normalizedOriginal)) {
          content = content.replace(
            new RegExp(escapeRegex(normalizedOriginal), 'g'),
            normalizedNew
          );
          changeCount++;
        }
      }
    }
  }
  
  return { content, changeCount };
}

// Helper to escape regex special characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Main import function
async function importWebsiteCopy() {
  // Check if edited CSV exists
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ Could not find ${INPUT_FILE}`);
    console.log('Please ensure the edited CSV file is named "website-copy-edited.csv"');
    return;
  }
  
  // Read and parse CSV
  const csvContent = fs.readFileSync(INPUT_FILE, 'utf-8');
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true
  });
  
  // Load original data for comparison
  const originalData = JSON.parse(fs.readFileSync('./website-copy-backup.json', 'utf-8'));
  const originalMap = new Map(originalData.map(item => [item.id, item]));
  
  // Group updates by file
  const updatesByFile = new Map();
  let totalChanges = 0;
  
  for (const record of records) {
    const original = originalMap.get(record.ID);
    if (!original) {
      console.warn(`⚠️  Could not find original entry for ID: ${record.ID}`);
      continue;
    }
    
    // Check if text has changed
    if (original.text !== record.Text) {
      const fileName = `${record.Page}.astro`;
      const filePath = path.join(PAGES_DIR, fileName);
      
      if (!updatesByFile.has(filePath)) {
        updatesByFile.set(filePath, []);
      }
      
      updatesByFile.get(filePath).push({
        id: record.ID,
        originalText: original.text,
        newText: record.Text,
        element: record.Element,
        location: record.Location
      });
      
      totalChanges++;
    }
  }
  
  if (totalChanges === 0) {
    console.log('✅ No changes detected in the edited CSV.');
    return;
  }
  
  console.log(`\n📝 Found ${totalChanges} text changes across ${updatesByFile.size} files\n`);
  
  // Apply updates to each file
  for (const [filePath, updates] of updatesByFile) {
    console.log(`\n📄 Processing ${path.basename(filePath)}...`);
    
    // Create backup
    const backupPath = backupFile(filePath);
    console.log(`   ✅ Backup created: ${backupPath}`);
    
    // Apply updates
    const { content, changeCount } = updateFileContent(filePath, updates);
    
    // Write updated content
    fs.writeFileSync(filePath, content);
    console.log(`   ✅ Applied ${changeCount} of ${updates.length} changes`);
    
    // Show what was changed
    for (const update of updates.slice(0, 3)) {
      console.log(`   📝 "${update.originalText.substring(0, 50)}..." → "${update.newText.substring(0, 50)}..."`);
    }
    if (updates.length > 3) {
      console.log(`   ... and ${updates.length - 3} more changes`);
    }
  }
  
  console.log(`\n✅ Import complete! Updated ${totalChanges} text entries across ${updatesByFile.size} files.`);
  console.log(`\n💡 Original files have been backed up to ${BACKUP_DIR}/`);
}

// Run import
importWebsiteCopy();
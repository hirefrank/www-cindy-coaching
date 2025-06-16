import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';

const PAGES_DIR = './src/pages';
const OUTPUT_FILE = './website-copy.csv';

// Helper to generate consistent IDs
function generateId(file, lineNumber, textContent) {
  const hash = createHash('md5')
    .update(`${file}-${lineNumber}-${textContent.substring(0, 30)}`)
    .digest('hex')
    .substring(0, 8);
  return hash;
}

// Helper to clean text
function cleanText(text) {
  return text
    .replace(/\s+/g, ' ')
    .replace(/^\s+|\s+$/g, '')
    .replace(/"/g, '""'); // Escape quotes for CSV
}

// Extract text content from Astro files
function extractTextFromAstro(content, filePath) {
  const entries = [];
  const pageName = path.basename(filePath, '.astro');
  const pageUrl = pageName === 'index' ? '/' : `/${pageName}`;
  
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNumber = i + 1;
    
    // Skip if line is likely JavaScript/TypeScript code
    if (line.includes('const ') || line.includes('let ') || line.includes('function ') || line.includes('import ')) {
      continue;
    }
    
    // Extract from specific attributes first
    const attrPatterns = [
      { pattern: /title="([^"]*)"/g, name: 'title' },
      { pattern: /alt="([^"]*)"/g, name: 'alt' },
      { pattern: /placeholder="([^"]*)"/g, name: 'placeholder' },
      { pattern: /description="([^"]*)"/g, name: 'description' },
      { pattern: /aria-label="([^"]*)"/g, name: 'aria-label' }
    ];
    
    for (const { pattern, name } of attrPatterns) {
      const matches = line.matchAll(pattern);
      for (const match of matches) {
        const text = match[1].trim();
        if (text) {
          entries.push({
            id: generateId(filePath, lineNumber, text),
            page: pageName,
            url: pageUrl,
            element: `@${name}`,
            location: `${filePath}:${lineNumber}`,
            text: cleanText(text),
            lineNumber
          });
        }
      }
    }
    
    // Extract text from specific elements (most specific patterns first)
    // Full heading tags on one line
    const headingMatch = line.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/);
    if (headingMatch) {
      const text = headingMatch[1].trim();
      if (text && !text.includes('{')) {
        entries.push({
          id: generateId(filePath, lineNumber, text),
          page: pageName,
          url: pageUrl,
          element: 'heading',
          location: `${filePath}:${lineNumber}`,
          text: cleanText(text),
          lineNumber
        });
        continue; // Skip other patterns for this line
      }
    }
    
    // Full paragraph tags on one line
    const fullParagraphMatch = line.match(/<p[^>]*>([^<]+)<\/p>/);
    if (fullParagraphMatch) {
      const text = fullParagraphMatch[1].trim();
      if (text && !text.includes('{')) {
        entries.push({
          id: generateId(filePath, lineNumber, text),
          page: pageName,
          url: pageUrl,
          element: 'paragraph',
          location: `${filePath}:${lineNumber}`,
          text: cleanText(text),
          lineNumber
        });
        continue; // Skip other patterns for this line
      }
    }
    
    // List items
    const listItemMatch = line.match(/<li[^>]*>([^<]+)<\/li>/);
    if (listItemMatch) {
      const text = listItemMatch[1].trim();
      if (text && !text.includes('{')) {
        entries.push({
          id: generateId(filePath, lineNumber, text),
          page: pageName,
          url: pageUrl,
          element: 'list-item',
          location: `${filePath}:${lineNumber}`,
          text: cleanText(text),
          lineNumber
        });
        continue;
      }
    }
    
    // Button/link text (full tags)
    const buttonMatch = line.match(/<(button|a)[^>]*>([^<]+)<\/(button|a)>/);
    if (buttonMatch) {
      const text = buttonMatch[2].trim();
      if (text && !text.includes('{')) {
        entries.push({
          id: generateId(filePath, lineNumber, text),
          page: pageName,
          url: pageUrl,
          element: buttonMatch[1],
          location: `${filePath}:${lineNumber}`,
          text: cleanText(text),
          lineNumber
        });
        continue; // Skip other patterns for this line
      }
    }
    
    // Span and div with text
    const spanDivMatch = line.match(/<(span|div)[^>]*>([^<]+)<\/(span|div)>/);
    if (spanDivMatch) {
      const text = spanDivMatch[2].trim();
      if (text && !text.includes('{') && !text.includes('=')) {
        entries.push({
          id: generateId(filePath, lineNumber, text),
          page: pageName,
          url: pageUrl,
          element: spanDivMatch[1],
          location: `${filePath}:${lineNumber}`,
          text: cleanText(text),
          lineNumber
        });
        continue;
      }
    }
    
    // Partial paragraph tags (opening tag with content, but no closing tag on same line)
    const partialParagraphMatch = line.match(/<p[^>]*>([^<]+)$/);
    if (partialParagraphMatch && !fullParagraphMatch) {
      const text = partialParagraphMatch[1].trim();
      if (text && !text.includes('{')) {
        entries.push({
          id: generateId(filePath, lineNumber, text),
          page: pageName,
          url: pageUrl,
          element: 'paragraph',
          location: `${filePath}:${lineNumber}`,
          text: cleanText(text),
          lineNumber
        });
      }
    }
  }
  
  return entries;
}

// Main extraction function
async function extractWebsiteCopy() {
  console.log('🔍 Starting website copy extraction...\n');
  
  const allEntries = [];
  
  // Read all .astro files
  const files = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.astro'));
  
  for (const file of files) {
    const filePath = path.join(PAGES_DIR, file);
    console.log(`📄 Processing ${file}...`);
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const entries = extractTextFromAstro(content, filePath);
    
    console.log(`   ✅ Found ${entries.length} text entries`);
    allEntries.push(...entries);
  }
  
  // Sort entries by page and line number
  allEntries.sort((a, b) => {
    if (a.page !== b.page) return a.page.localeCompare(b.page);
    return a.lineNumber - b.lineNumber;
  });
  
  // Create CSV content
  let csvContent = 'ID,Page,URL,Element,Location,Text\n';
  
  for (const entry of allEntries) {
    csvContent += `"${entry.id}","${entry.page}","${entry.url}","${entry.element}","${entry.location}","${entry.text}"\n`;
  }
  
  // Write CSV file
  fs.writeFileSync(OUTPUT_FILE, csvContent);
  console.log(`\n✅ Extracted ${allEntries.length} text entries to ${OUTPUT_FILE}`);
  
  // Also create a JSON backup for easier processing
  fs.writeFileSync('./website-copy-backup.json', JSON.stringify(allEntries, null, 2));
  console.log('✅ Created JSON backup at website-copy-backup.json');
  
  // Create a sample edited file for reference
  fs.copyFileSync(OUTPUT_FILE, './website-copy-edited.csv');
  console.log('✅ Created website-copy-edited.csv (edit this file and run npm run import-copy)');
  
  console.log('\n📋 Next steps:');
  console.log('1. Open website-copy.csv in Google Sheets or Excel');
  console.log('2. Edit the "Text" column as needed');
  console.log('3. Save as website-copy-edited.csv');
  console.log('4. Run: npm run import-copy');
}

// Run extraction
extractWebsiteCopy();
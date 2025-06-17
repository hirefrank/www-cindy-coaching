import fs from 'fs'

console.log('📝 Updating migration script to remove null values...\n')

try {
  // Read the migration script
  const content = fs.readFileSync('./scripts/migrate-to-sanity.js', 'utf-8')
  
  // Replace all instances of "image: null" with nothing (remove the line)
  let updated = content.replace(/\s*image:\s*null(?:,|\s*\/\/.*)?/g, '')
  
  // Also update the comments
  updated = updated.replace(
    '// Add this to prevent "missing keys" error',
    ''
  )
  
  // Write the updated script
  fs.writeFileSync('./scripts/migrate-to-sanity-fixed.js', updated)
  
  console.log('✅ Created updated migration script: migrate-to-sanity-fixed.js')
  console.log('\n📝 The updated script:')
  console.log('- Removes all null image field assignments')
  console.log('- Lets Sanity handle undefined fields properly')
  console.log('\nYou can run the updated migration with:')
  console.log('node scripts/migrate-to-sanity-fixed.js')
} catch (error) {
  console.error('❌ Error updating migration script:', error.message)
}
import fs from 'fs'
import path from 'path'

// Schema files to update
const schemaFiles = [
  'seo.ts',
  'homePage.ts',
  'aboutPage.ts',
  'servicesPage.ts',
  'contactPage.ts',
  'resourcesPage.ts'
]

// Function to add validation rules to make image fields optional
function makeImagesOptional(content) {
  // Pattern to find image field definitions
  const imageFieldPattern = /(\s*{\s*name:\s*['"]image['"],[\s\S]*?)(type:\s*['"]image['"])([\s\S]*?})/g
  
  return content.replace(imageFieldPattern, (match, before, typeDecl, after) => {
    // Check if validation already exists
    if (after.includes('validation:')) {
      return match // Don't modify if validation already exists
    }
    
    // Check if there's already options or other properties
    if (after.trim() === '}') {
      // No other properties, add validation
      return `${before}${typeDecl},
      validation: (Rule: any) => Rule.optional()${after}`
    } else {
      // There are other properties, add validation after type
      return `${before}${typeDecl},
      validation: (Rule: any) => Rule.optional()${after}`
    }
  })
}

// Process each schema file
console.log('📝 Updating Sanity schemas to make image fields optional...\n')

schemaFiles.forEach(file => {
  const filePath = path.join('sanity/schemas', file)
  
  try {
    // Read current content
    const content = fs.readFileSync(filePath, 'utf-8')
    
    // Update content
    const updated = makeImagesOptional(content)
    
    if (content !== updated) {
      // Write updated content
      fs.writeFileSync(filePath, updated)
      console.log(`✅ Updated ${file}`)
    } else {
      console.log(`⏭️  No changes needed for ${file}`)
    }
  } catch (error) {
    console.log(`❌ Error updating ${file}: ${error.message}`)
  }
})

console.log('\n✨ Schema update complete!')
console.log('\n📝 Note: The validation rule makes image fields explicitly optional.')
console.log('This should prevent any "required field" errors in Sanity Studio.')
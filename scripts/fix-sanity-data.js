import { createClient } from '@sanity/client'
import fs from 'fs'

// Read .env file manually
function loadEnv() {
  try {
    const envFile = fs.readFileSync('.env', 'utf-8')
    const lines = envFile.split('\n')
    const env = {}
    
    lines.forEach(line => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=')
        env[key.trim()] = valueParts.join('=').trim()
      }
    })
    
    return env
  } catch (error) {
    console.error('Could not read .env file:', error.message)
    return {}
  }
}

const env = loadEnv()

const client = createClient({
  projectId: env.PUBLIC_SANITY_PROJECT_ID || 'y67p94j5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: env.SANITY_TOKEN,
  useCdn: false,
})

// Function to recursively remove null values from objects
function removeNullValues(obj) {
  if (Array.isArray(obj)) {
    return obj.map(item => removeNullValues(item))
  } else if (obj !== null && typeof obj === 'object') {
    const cleaned = {}
    for (const [key, value] of Object.entries(obj)) {
      if (value !== null) {
        cleaned[key] = removeNullValues(value)
      }
      // Don't include the key at all if value is null
    }
    return cleaned
  }
  return obj
}

// Define fixes for each page
const fixes = {
  homePage: async (doc) => {
    // Remove null image values
    const cleaned = removeNullValues(doc)
    
    // Ensure required fields are present
    if (!cleaned.hero?.heading) {
      console.log('  ⚠️  Adding missing hero.heading')
      cleaned.hero = cleaned.hero || {}
      cleaned.hero.heading = doc.hero?.heading || 'Physical Therapist turned ADHD Coach helping parents and neurodiverse individuals thrive through brain-body strategies'
    }
    
    return cleaned
  },
  
  aboutPage: async (doc) => {
    // Remove null values and ensure structure
    const cleaned = removeNullValues(doc)
    
    // Ensure seo object exists
    if (!cleaned.seo) {
      cleaned.seo = {}
    }
    
    // Ensure required nested structures exist
    if (!cleaned.personalJourney) {
      cleaned.personalJourney = {}
    }
    if (!cleaned.professionalEvolution) {
      cleaned.professionalEvolution = {}
    }
    
    return cleaned
  },
  
  servicesPage: async (doc) => {
    const cleaned = removeNullValues(doc)
    
    // Ensure seo object exists
    if (!cleaned.seo) {
      cleaned.seo = {}
    }
    
    return cleaned
  },
  
  contactPage: async (doc) => {
    const cleaned = removeNullValues(doc)
    
    // Ensure seo object exists
    if (!cleaned.seo) {
      cleaned.seo = {}
    }
    
    return cleaned
  },
  
  resourcesPage: async (doc) => {
    const cleaned = removeNullValues(doc)
    
    // Ensure seo object exists
    if (!cleaned.seo) {
      cleaned.seo = {}
    }
    
    return cleaned
  }
}

async function fixSanityData() {
  console.log('🔧 Fixing Sanity data issues...\n')
  
  const results = []
  
  for (const [pageId, fixFunction] of Object.entries(fixes)) {
    try {
      console.log(`📄 Processing ${pageId}...`)
      
      // Get current document
      const doc = await client.getDocument(pageId)
      
      if (!doc) {
        console.log(`  ❌ Document not found`)
        results.push({ pageId, success: false, error: 'Document not found' })
        continue
      }
      
      // Apply fixes
      const fixed = await fixFunction(doc)
      
      // Check if anything changed
      const original = JSON.stringify(doc)
      const updated = JSON.stringify(fixed)
      
      if (original === updated) {
        console.log(`  ✅ No changes needed`)
        results.push({ pageId, success: true, changed: false })
      } else {
        // Update document
        const result = await client.createOrReplace({
          ...fixed,
          _id: pageId,
          _type: pageId
        })
        
        console.log(`  ✅ Fixed and updated`)
        results.push({ pageId, success: true, changed: true })
      }
      
      console.log()
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`)
      results.push({ pageId, success: false, error: error.message })
      console.log()
    }
  }
  
  // Summary
  console.log('\n📊 Fix Summary:')
  console.log(`✅ Successful: ${results.filter(r => r.success).length}`)
  console.log(`📝 Updated: ${results.filter(r => r.success && r.changed).length}`)
  console.log(`❌ Failed: ${results.filter(r => !r.success).length}`)
  
  if (results.some(r => !r.success)) {
    console.log('\n❌ Failed fixes:')
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.pageId}: ${r.error}`)
    })
  }
  
  console.log('\n✨ Fix complete!')
  console.log('\n📝 Next steps:')
  console.log('1. Restart Sanity Studio to see the changes')
  console.log('2. The "reset value" and "missing keys" errors should be resolved')
  console.log('3. You can now upload images through the Studio interface')
}

// Run the fix
fixSanityData()
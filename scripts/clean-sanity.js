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

// Initialize Sanity client
const sanityClient = createClient({
  projectId: env.PUBLIC_SANITY_PROJECT_ID || 'y67p94j5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: env.SANITY_TOKEN,
  useCdn: false,
})

async function cleanSanity() {
  console.log('🧹 Cleaning up existing Sanity documents...\n')
  
  const documentIds = ['homePage', 'aboutPage', 'servicesPage', 'contactPage', 'resourcesPage']
  
  for (const id of documentIds) {
    try {
      console.log(`🗑️  Deleting ${id}...`)
      await sanityClient.delete(id)
      console.log(`✅ Deleted ${id}`)
    } catch (error) {
      console.log(`⚠️  ${id} not found or already deleted`)
    }
  }
  
  console.log('\n✨ Cleanup complete!')
}

cleanSanity()
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

async function inspectData() {
  console.log('🔍 Inspecting Sanity data...\n')
  
  try {
    // Fetch the home page document
    const homePage = await sanityClient.fetch('*[_id == "homePage"][0]')
    
    console.log('Home Page Document:')
    console.log(JSON.stringify(homePage, null, 2))
    
    console.log('\n\nType of seo field:', typeof homePage?.seo)
    console.log('Type of seo.title:', typeof homePage?.seo?.title)
    
    // Also check the raw document
    console.log('\n\nRaw query result:')
    const raw = await sanityClient.getDocument('homePage')
    console.log(JSON.stringify(raw, null, 2))
    
  } catch (error) {
    console.error('Error:', error)
  }
}

inspectData()
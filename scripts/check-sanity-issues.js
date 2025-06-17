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

// Define expected schema structure
const schemas = {
  homePage: {
    seo: ['title', 'description', 'image'],
    hero: ['heading', 'subheading', 'primaryButtonText', 'secondaryButtonText', 'image'],
    trustIndicators: {
      array: true,
      fields: ['label', 'title', 'subtitle']
    },
    servicesSection: {
      object: true,
      fields: ['heading', 'description'],
      services: {
        array: true,
        fields: ['icon', 'title', 'description', 'linkText']
      }
    },
    aboutSection: ['heading', 'paragraphs', 'buttonText', 'image'],
    ctaSection: ['heading', 'description', 'primaryButtonText', 'secondaryButtonText']
  },
  aboutPage: {
    seo: ['title', 'description', 'image'],
    hero: ['heading', 'description'],
    personalJourney: ['heading', 'paragraphs', 'image'],
    professionalEvolution: ['heading', 'paragraphs', 'image'],
    credentials: {
      object: true,
      fields: ['heading', 'description'],
      certifications: {
        array: true,
        fields: ['abbreviation', 'title', 'description']
      },
      continuingEducation: ['heading', 'items']
    },
    approach: {
      object: true,
      fields: ['heading', 'description'],
      principles: {
        array: true,
        fields: ['title', 'description']
      }
    },
    personal: {
      object: true,
      fields: ['heading', 'description', 'conclusion'],
      interests: {
        array: true,
        fields: ['emoji', 'label']
      }
    },
    ctaSection: ['heading', 'description', 'primaryButtonText', 'secondaryButtonText']
  },
  servicesPage: {
    seo: ['title', 'description', 'image'],
    hero: ['heading', 'description'],
    serviceCategories: {
      array: true,
      fields: ['categoryTitle'],
      services: {
        array: true,
        fields: ['icon', 'title', 'description', 'features', 'format']
      }
    },
    ctaSection: ['heading', 'description', 'buttonText']
  },
  contactPage: {
    seo: ['title', 'description', 'image'],
    hero: ['heading', 'description'],
    contactInfo: {
      object: true,
      fields: ['heading'],
      email: ['icon', 'label', 'value'],
      location: ['icon', 'label', 'value'],
      hours: ['icon', 'label', 'regularHours', 'additionalInfo']
    },
    schedulingSection: {
      object: true,
      fields: ['heading'],
      options: {
        array: true,
        fields: ['title', 'description', 'buttonText', 'calendlyLink']
      }
    },
    faq: {
      object: true,
      fields: ['heading'],
      questions: {
        array: true,
        fields: ['question', 'answer']
      }
    },
    ctaSection: ['heading', 'description', 'buttonText']
  },
  resourcesPage: {
    seo: ['title', 'description', 'image'],
    hero: ['heading', 'description'],
    newsletter: ['heading', 'description', 'placeholder', 'buttonText'],
    categoriesSection: ['heading'],
    ctaSection: ['heading', 'description', 'buttonText']
  }
}

function checkMissingFields(data, schema, path = '') {
  const issues = []
  
  for (const [key, value] of Object.entries(schema)) {
    const currentPath = path ? `${path}.${key}` : key
    
    if (Array.isArray(value)) {
      // Check object fields
      if (!data || !data[key]) {
        issues.push(`Missing object: ${currentPath}`)
      } else {
        value.forEach(field => {
          if (data[key][field] === undefined) {
            issues.push(`Missing field: ${currentPath}.${field}`)
          } else if (data[key][field] === null) {
            issues.push(`Null value: ${currentPath}.${field}`)
          }
        })
      }
    } else if (typeof value === 'object') {
      if (value.array) {
        // Check array
        if (!data || !data[key] || !Array.isArray(data[key])) {
          issues.push(`Missing or invalid array: ${currentPath}`)
        } else if (data[key].length === 0) {
          issues.push(`Empty array: ${currentPath}`)
        } else if (value.fields) {
          // Check fields in array items
          data[key].forEach((item, index) => {
            value.fields.forEach(field => {
              if (item[field] === undefined) {
                issues.push(`Missing field in array item ${index}: ${currentPath}[${index}].${field}`)
              } else if (item[field] === null) {
                issues.push(`Null value in array item ${index}: ${currentPath}[${index}].${field}`)
              }
            })
          })
        }
      } else if (value.object) {
        // Check nested object
        if (!data || !data[key]) {
          issues.push(`Missing object: ${currentPath}`)
        } else {
          // Check nested fields
          if (value.fields) {
            value.fields.forEach(field => {
              if (data[key][field] === undefined) {
                issues.push(`Missing field: ${currentPath}.${field}`)
              } else if (data[key][field] === null) {
                issues.push(`Null value: ${currentPath}.${field}`)
              }
            })
          }
          
          // Check nested structures
          for (const [nestedKey, nestedValue] of Object.entries(value)) {
            if (nestedKey !== 'object' && nestedKey !== 'fields') {
              const nestedIssues = checkMissingFields(data[key], { [nestedKey]: nestedValue }, currentPath)
              issues.push(...nestedIssues)
            }
          }
        }
      }
    }
  }
  
  return issues
}

async function analyzeData() {
  console.log('🔍 Analyzing Sanity data for missing fields and null values...\n')
  
  for (const [pageType, pageSchema] of Object.entries(schemas)) {
    try {
      const doc = await client.getDocument(pageType)
      
      if (!doc) {
        console.log(`❌ ${pageType}: Document not found\n`)
        continue
      }
      
      console.log(`📄 ${pageType}:`)
      
      const issues = checkMissingFields(doc, pageSchema)
      
      if (issues.length === 0) {
        console.log('  ✅ All fields present and non-null')
      } else {
        console.log('  ⚠️  Issues found:')
        issues.forEach(issue => console.log(`    - ${issue}`))
      }
      
      console.log()
    } catch (error) {
      console.log(`❌ ${pageType}: Error - ${error.message}\n`)
    }
  }
  
  console.log('\n📝 Summary:')
  console.log('The "reset value" and "missing keys" errors are likely due to:')
  console.log('1. Null values for image fields (all pages have seo.image = null)')
  console.log('2. Missing nested fields in objects')
  console.log('3. Sanity Studio expecting all fields defined in schemas to have values')
  console.log('\n💡 To fix these issues, you can:')
  console.log('1. Update the migration to provide empty objects {} instead of null for images')
  console.log('2. Make fields optional in schemas using validation rules')
  console.log('3. Provide default values in the schema definitions')
}

analyzeData()
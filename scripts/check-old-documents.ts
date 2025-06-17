#!/usr/bin/env tsx
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-03-01',
  useCdn: false
});

console.log('🔍 Checking for old schema documents...\n');

async function checkOldDocuments() {
  try {
    // List of old document types
    const oldTypes = [
      'homePage',
      'aboutPage',
      'servicesPage',
      'contactPage',
      'resourcesPage'
    ];

    let totalOldDocs = 0;

    for (const docType of oldTypes) {
      const documents = await client.fetch(`*[_type == "${docType}"]{ _id, _type, _updatedAt }`);
      
      if (documents.length > 0) {
        console.log(`\n📄 ${docType}: ${documents.length} document(s)`);
        documents.forEach((doc: any) => {
          console.log(`   - ${doc._id} (last updated: ${new Date(doc._updatedAt).toLocaleDateString()})`);
        });
        totalOldDocs += documents.length;
      } else {
        console.log(`✅ ${docType}: No documents found`);
      }
    }

    console.log(`\n📊 Total old documents found: ${totalOldDocs}`);

    if (totalOldDocs > 0) {
      console.log('\n💡 To delete these documents, run:');
      console.log('   npm run cleanup-old-schemas');
    } else {
      console.log('\n✨ No old documents to clean up!');
    }

    // Also check new structure
    console.log('\n🆕 New modular structure status:');
    const newTypes = ['hero', 'service', 'testimonial', 'ctaBlock', 'teamMember', 'homePageNew'];
    
    for (const docType of newTypes) {
      const count = await client.fetch(`count(*[_type == "${docType}"])`);
      if (count > 0) {
        console.log(`   ✅ ${docType}: ${count} document(s)`);
      }
    }

  } catch (error) {
    console.error('❌ Check failed:', error);
  }
}

checkOldDocuments();
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

console.log('🧹 Starting cleanup of old schema documents...\n');

async function deleteOldDocuments() {
  try {
    // List of old document types to delete
    const oldTypes = [
      'homePage',
      'aboutPage',
      'servicesPage',
      'contactPage',
      'resourcesPage'
    ];

    for (const docType of oldTypes) {
      console.log(`\n📋 Checking for ${docType} documents...`);
      
      // Fetch all documents of this type
      const documents = await client.fetch(`*[_type == "${docType}"]{ _id, _type }`);
      
      if (documents.length === 0) {
        console.log(`✅ No ${docType} documents found`);
        continue;
      }

      console.log(`Found ${documents.length} ${docType} document(s)`);
      
      // Delete each document
      for (const doc of documents) {
        try {
          await client.delete(doc._id);
          console.log(`  ✅ Deleted ${doc._id}`);
        } catch (error) {
          console.error(`  ❌ Failed to delete ${doc._id}:`, (error as Error).message);
        }
      }
    }

    console.log('\n🎉 Cleanup completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Deploy the updated schemas to Sanity Studio');
    console.log('2. Verify the website still works correctly');
    console.log('3. The adapters will now use the new modular structure');

  } catch (error) {
    console.error('❌ Cleanup failed:', error);
  }
}

// Add confirmation prompt
console.log('⚠️  WARNING: This will permanently delete all old page documents!');
console.log('Make sure you have migrated all content to the new modular structure.\n');
console.log('Type "yes" to continue, or Ctrl+C to cancel:');

process.stdin.once('data', (data) => {
  if (data.toString().trim().toLowerCase() === 'yes') {
    deleteOldDocuments();
  } else {
    console.log('❌ Cleanup cancelled');
    process.exit(0);
  }
});
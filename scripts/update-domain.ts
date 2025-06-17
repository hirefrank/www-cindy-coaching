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

console.log('🔄 Updating domain references in Sanity...\n');

async function updateDomain() {
  try {
    // Update site settings
    console.log('📝 Updating site settings...');
    const siteSettings = await client.fetch(`*[_type == "siteSettings"][0]`);
    
    if (siteSettings) {
      await client
        .patch(siteSettings._id)
        .set({
          'contact.email': 'hello@mindfulbalanceadhdcoaching.com',
          'contact.calendlyUrl': 'https://calendly.com/mindfulbalance'
        })
        .commit();
      console.log('✅ Updated site settings');
    }

    // Update CTA blocks with new Cal.com links
    console.log('\n📝 Updating CTA blocks...');
    const ctaBlocks = await client.fetch(`*[_type == "ctaBlock"]`);
    
    for (const cta of ctaBlocks) {
      const updatedButtons = cta.buttons?.map((button: any) => {
        if (button.link?.includes('/contact')) {
          return button; // Keep contact links as-is
        }
        // Update any Cal.com links
        if (button.link?.includes('cindy-romanzo')) {
          return {
            ...button,
            link: button.link.replace('cindy-romanzo', 'mindfulbalance')
          };
        }
        return button;
      });

      if (updatedButtons) {
        await client
          .patch(cta._id)
          .set({ buttons: updatedButtons })
          .commit();
        console.log(`✅ Updated ${cta.internalTitle}`);
      }
    }

    console.log('\n✨ Domain update completed!');
    console.log('\n📋 Next steps:');
    console.log('1. Deploy the website to see changes');
    console.log('2. Update Cal.com account to use "mindfulbalance" username');
    console.log('3. Update DNS records to point to new domain');

  } catch (error) {
    console.error('❌ Update failed:', error);
  }
}

// Run update
updateDomain();
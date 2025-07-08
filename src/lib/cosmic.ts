import { createBucketClient } from '@cosmicjs/sdk';

if (!import.meta.env.COSMIC_BUCKET_SLUG) {
  throw new Error('COSMIC_BUCKET_SLUG environment variable is not set');
}

if (!import.meta.env.COSMIC_READ_KEY) {
  throw new Error('COSMIC_READ_KEY environment variable is not set');
}

export const cosmic = createBucketClient({
  bucketSlug: import.meta.env.COSMIC_BUCKET_SLUG,
  readKey: import.meta.env.COSMIC_READ_KEY
});

// Helper function to get homepage content
export async function getHomepageContent() {
  try {
    const response = await cosmic.objects.findOne({
      type: "homepage",
      slug: "homepage"
    }).props("slug,title,metadata,type")
    .depth(1);
    
    return response.object;
  } catch (error) {
    console.error('Error fetching homepage content from Cosmic:', error);
    return null;
  }
}

// Helper function to get footer content
export async function getFooterContent() {
  try {
    const response = await cosmic.objects.findOne({
      type: "footer",
      slug: "footer"
    }).props("slug,title,metadata,type")
    .depth(1);
    
    return response.object;
  } catch (error) {
    console.error('Error fetching footer content from Cosmic:', error);
    return null;
  }
}

// Helper function to get global settings
export async function getGlobalSettings() {
  try {
    const response = await cosmic.objects.findOne({
      type: "global-settings",
      slug: "global-settings"
    }).props("slug,title,metadata,type")
    .depth(1);
    
    return response.object;
  } catch (error) {
    console.error('Error fetching global settings from Cosmic:', error);
    return null;
  }
}

// Helper function to get contact page content
export async function getContactContent() {
  try {
    const response = await cosmic.objects.findOne({
      type: "contact",
      slug: "contact"
    }).props("slug,title,metadata,type")
    .depth(1);
    
    return response.object;
  } catch (error) {
    console.error('Error fetching contact content from Cosmic:', error);
    return null;
  }
}
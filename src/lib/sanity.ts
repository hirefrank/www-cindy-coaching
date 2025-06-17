import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

// Image URL helper without the problematic package
export function urlFor(source: any) {
  if (!source || !source.asset) return { url: () => '' };
  
  const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
  const dataset = 'production';
  
  // Extract asset reference
  const ref = source.asset._ref || source.asset;
  if (!ref) return { url: () => '' };
  
  // Parse the asset reference
  const [, id, dimensions, format] = ref.match(/^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/) || [];
  
  if (!id) return { url: () => '' };
  
  // Construct CDN URL
  const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
  
  return {
    url: () => baseUrl,
    width: (w: number) => `${baseUrl}?w=${w}`,
    height: (h: number) => `${baseUrl}?h=${h}`,
    quality: (q: number) => `${baseUrl}?q=${q}`,
    auto: (format: string) => `${baseUrl}?auto=${format}`,
  };
}
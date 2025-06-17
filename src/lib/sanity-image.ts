// Wrapper for @sanity/image-url to handle CommonJS compatibility
import { createClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = 'production';

// Simple image URL builder without the problematic package
export function urlFor(source: any) {
  if (!source || !source.asset) return '';
  
  // Extract asset reference
  const ref = source.asset._ref || source.asset;
  if (!ref) return '';
  
  // Parse the asset reference
  // Format: image-{id}-{dimensions}-{format}
  const [, id, dimensions, format] = ref.match(/^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/) || [];
  
  if (!id) return '';
  
  // Construct CDN URL
  const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
  
  return {
    url: () => baseUrl,
    width: (w: number) => `${baseUrl}?w=${w}`,
    height: (h: number) => `${baseUrl}?h=${h}`,
    size: (w: number, h: number) => `${baseUrl}?w=${w}&h=${h}`,
    quality: (q: number) => `${baseUrl}?q=${q}`,
    auto: (format: string) => `${baseUrl}?auto=${format}`,
    fit: (mode: string) => `${baseUrl}?fit=${mode}`,
  };
}

// Alternative: Direct URL construction
export function getImageUrl(source: any, params?: { width?: number; height?: number; quality?: number }) {
  if (!source || !source.asset) return '';
  
  const ref = source.asset._ref || source.asset;
  if (!ref) return '';
  
  const [, id, dimensions, format] = ref.match(/^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/) || [];
  if (!id) return '';
  
  let url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
  
  const queryParams = [];
  if (params?.width) queryParams.push(`w=${params.width}`);
  if (params?.height) queryParams.push(`h=${params.height}`);
  if (params?.quality) queryParams.push(`q=${params.quality}`);
  
  if (queryParams.length > 0) {
    url += '?' + queryParams.join('&');
  }
  
  return url;
}
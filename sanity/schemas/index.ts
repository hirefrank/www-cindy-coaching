// Shared schemas
import seo from './seo'

// New modular document schemas
import hero from './documents/hero'
import service from './documents/service'
import testimonial from './documents/testimonial'
import ctaBlock from './documents/ctaBlock'
import resource from './documents/resource'
import teamMember from './documents/teamMember'

// Section schemas (used within pages)
import servicesSection from './sections/servicesSection'
import testimonialsSection from './sections/testimonialsSection'
import aboutSection from './sections/aboutSection'
import trustIndicators from './sections/trustIndicators'

// Page schemas
import page from './page'
import homePageNew from './homePageNew'
import siteSettings from './siteSettings'

export const schemaTypes = [
  // Shared schemas
  seo,
  
  // Modular document schemas
  hero,
  service,
  testimonial,
  ctaBlock,
  resource,
  teamMember,
  
  // Section schemas (not documents, used within pages)
  servicesSection,
  testimonialsSection,
  aboutSection,
  trustIndicators,
  
  // Page schemas
  page,
  homePageNew,
  siteSettings
]
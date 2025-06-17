# Sanity CMS Architecture Guide

## Overview

This guide documents the modular content architecture for the Sanity CMS implementation. The system has been designed to move away from monolithic page documents to a flexible, reusable content structure that provides a superior editorial experience.

## Architecture Rationale

### Problems with Monolithic Structure
- Each page was one massive document with all content embedded
- Difficult navigation and editing in Sanity Studio
- No content reusability across pages
- Poor editorial experience for content managers
- Performance issues loading entire page documents

### Benefits of Modular Architecture
1. **Better Organization**: Each content type has its own section in Studio
2. **Reusability**: Services, testimonials, CTAs can be used across multiple pages
3. **Easier Editing**: Smaller, focused documents that are manageable
4. **Better Performance**: Load only the content needed for each page
5. **Scalability**: Easy to add new content types and sections
6. **Editorial UX**: Focused, intuitive content management

## Content Architecture

### Design Principles

Instead of embedding all content in a single document:
```typescript
// AVOID: Monolithic approach
{
  name: 'homePage',
  fields: [
    { name: 'seo', type: 'seo' },
    { name: 'hero', type: 'object', fields: [...] },
    { name: 'trustIndicators', type: 'object', fields: [...] },
    { name: 'servicesSection', type: 'object', fields: [...] },
    { name: 'aboutSection', type: 'object', fields: [...] },
    { name: 'ctaSection', type: 'object', fields: [...] }
  ]
}
```

Use references to modular documents:
```typescript
// PREFERRED: Modular approach
{
  name: 'homePage',
  fields: [
    { name: 'seo', type: 'seo' },
    { name: 'hero', type: 'reference', to: [{type: 'hero'}] },
    { name: 'sections', type: 'array', of: [
      { type: 'reference', to: [
        {type: 'servicesSection'},
        {type: 'testimonialSection'},
        {type: 'ctaBlock'}
      ]}
    ]}
  ]
}
```

### Document Types

#### Reusable Content Documents

1. **Hero Sections** (`hero`)
   - Reusable hero banners with heading, subheading, CTA, and background image
   - Can be shared across multiple pages

2. **Services** (`service`)
   - Individual service offerings with full descriptions
   - Includes benefits, pricing, and ordering

3. **Testimonials** (`testimonial`)
   - Client testimonials with name, role, and content
   - Featured across different pages

4. **CTA Blocks** (`ctaBlock`)
   - Call-to-action sections with different styles
   - Reusable campaign elements

5. **Team Members** (`teamMember`)
   - Staff profiles with credentials
   - Specialties and bio information

6. **Resources** (`resource`)
   - Articles, guides, worksheets
   - Categorized and filterable content

#### Page Documents

1. **Generic Pages** (`page`)
   - Flexible page builder with section array
   - Mix and match any content types

2. **Home Page** (`homePageNew`)
   - Specific home page structure
   - Optimized for homepage needs

3. **Site Settings** (`siteSettings`)
   - Global navigation configuration
   - Footer content and contact information

## Schema Implementation

### Hero Section Schema Example
```typescript
export default {
  name: 'hero',
  title: 'Hero Sections',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'For internal reference only'
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    },
    {
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
    },
    {
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true }
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'heading'
    }
  }
}
```

### Page Builder Schema Example
```typescript
export default {
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      }
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
    {
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { 
          type: 'reference',
          title: 'Hero Section',
          to: [{type: 'hero'}] 
        },
        {
          type: 'object',
          name: 'servicesGrid',
          title: 'Services Grid',
          fields: [
            {
              name: 'title',
              type: 'string',
            },
            {
              name: 'services',
              type: 'array',
              of: [{
                type: 'reference',
                to: [{type: 'service'}]
              }]
            }
          ]
        },
        {
          type: 'reference',
          title: 'CTA Block',
          to: [{type: 'ctaBlock'}]
        }
      ]
    }
  ]
}
```

## Studio Organization

The Sanity Studio sidebar reflects the modular structure:

```
├── Pages
│   ├── Home Page (New)
│   └── [Other Pages]
├── Hero Sections
│   ├── Home Page Hero
│   └── About Page Hero
├── Services
│   ├── Executive Function Coaching
│   ├── Parent Coaching
│   └── Academic Coaching
├── Testimonials
│   ├── Sarah M.
│   ├── Michael T.
│   └── Jennifer K.
├── CTA Blocks
│   ├── Schedule Consultation CTA
│   └── Download Resources CTA
├── Team Members
│   └── Cindy Romanzo
├── Resources
└── Site Settings
    └── Cindy Romanzo Coaching
```

## Frontend Integration

### GROQ Query Pattern

Fetch pages with all referenced content:

```javascript
const pageQuery = `*[_type == "homePageNew"][0]{
  seo,
  hero->{
    heading,
    subheading,
    ctaText,
    ctaLink,
    image
  },
  servicesSection{
    title,
    services[]->{
      title,
      shortDescription,
      icon,
      benefits,
      link
    }
  },
  testimonialSection{
    title,
    testimonials[]->{
      name,
      role,
      content,
      image
    }
  }
}`
```

### Page Builder Query

For flexible page layouts:

```javascript
const pageQuery = `*[_type == "page" && slug.current == $slug][0]{
  title,
  seo,
  sections[]{
    _type == 'reference' => @->{
      _type,
      ...
    },
    _type == 'servicesGrid' => {
      title,
      services[]->{
        title,
        description,
        icon
      }
    },
    _type == 'testimonialSection' => {
      title, 
      testimonials[]->{
        name,
        role,
        content
      }
    }
  }
}`
```

## Development Workflow

### Editing Content
1. Navigate to the specific content type in Studio
2. Click on the item to edit
3. Make changes and publish

### Creating New Content
1. Click "+" next to the content type
2. Fill in required fields
3. Set internal reference title for easy identification
4. Publish when ready

### Building Pages
1. Go to Pages → Create new
2. Add sections by selecting from available types:
   - Hero references
   - Service grids
   - Testimonial sections
   - CTA blocks
   - Rich text content
3. Arrange sections in desired order
4. Configure section-specific settings

## Implementation Checklist

### Phase 1: Schema Creation
- [x] Create modular document schemas
- [x] Define reference relationships
- [x] Set up preview configurations

### Phase 2: Content Migration
- [x] Create sample content for each type
- [x] Test reference relationships
- [x] Verify data structure

### Phase 3: Frontend Updates
- [x] Update GROQ queries for modular structure
- [x] Create component mapping for sections
- [x] Test data flow

### Phase 4: Production Rollout
- [ ] Migrate all existing content
- [ ] Update all page queries
- [ ] Remove legacy schemas
- [ ] Train content editors

## Best Practices

### Content Modeling
- Keep documents focused and single-purpose
- Use clear, descriptive titles for internal reference
- Set appropriate validation rules
- Configure helpful preview settings

### Performance
- Query only required fields
- Use projections to shape data
- Implement proper caching strategies
- Lazy load heavy content sections

### Editorial Experience
- Provide clear field descriptions
- Use appropriate input components
- Group related fields logically
- Set up intuitive document ordering

## Troubleshooting

### Common Issues

**Content Not Appearing**
- Verify content is published (not just saved)
- Check reference connections are valid
- Ensure queries include all required fields

**Missing Images**
- Upload images directly in Sanity Studio
- Check image field configuration
- Verify CDN URLs are correct

**Query Errors**
- Test queries in GROQ playground
- Verify document type names match schemas
- Check reference expansion syntax

### Debug Tools
- Sanity Vision plugin for query testing
- Studio structure tool for relationship viewing
- Browser DevTools for frontend debugging

## Migration Notes

When migrating from monolithic to modular:

1. Run new structure in parallel (e.g., `/index-modular`)
2. Compare output with original pages
3. Gradually migrate content sections
4. Update frontend routes once verified
5. Archive old schemas after full migration

This architecture provides a foundation for scalable, maintainable content management while delivering an excellent editorial experience.
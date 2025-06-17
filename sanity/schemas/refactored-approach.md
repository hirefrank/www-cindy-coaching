# Refactored Sanity Schema Approach

## Current Issues
- Each page is one massive document
- Difficult to navigate and edit
- No content reusability
- Poor editorial experience

## Recommended Structure

### 1. Break Into Smaller Documents

Instead of:
```typescript
// Current: Everything in one document
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

Use this approach:
```typescript
// Separate document types
- hero (document)
- service (document) 
- testimonial (document)
- ctaBlock (document)
- teamMember (document)
- resource (document)

// Page documents reference these
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

### 2. Example Refactored Schemas

#### Hero Section (Reusable)
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

#### Service (Individual Items)
```typescript
export default {
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ]
}
```

#### Page Builder Approach
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
          type: 'object',
          name: 'testimonialSection',
          title: 'Testimonials',
          fields: [
            {
              name: 'title',
              type: 'string',
            },
            {
              name: 'testimonials',
              type: 'array',
              of: [{
                type: 'reference',
                to: [{type: 'testimonial'}]
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

### 3. Benefits

1. **Better Organization**: Each content type has its own section in Studio
2. **Reusability**: Services, testimonials, CTAs can be used across pages
3. **Easier Editing**: Smaller, focused documents
4. **Better Performance**: Load only what you need
5. **Scalability**: Easy to add new section types

### 4. Migration Path

1. Create new schemas alongside existing ones
2. Migrate content gradually
3. Update frontend queries
4. Remove old schemas once complete

### 5. Studio Organization

With this approach, your Studio sidebar would show:
```
├── Pages
│   ├── Home
│   ├── About
│   └── Services
├── Hero Sections
│   ├── Homepage Hero
│   └── About Hero
├── Services
│   ├── Executive Function Coaching
│   ├── Academic Coaching
│   └── Life Skills Coaching
├── Testimonials
│   ├── Sarah M.
│   ├── Parent of Teen
│   └── College Student
├── CTA Blocks
│   ├── Schedule Consultation
│   └── Download Resources
└── Site Settings
    ├── Navigation
    └── Footer
```

## Implementation Steps

1. **Phase 1**: Create new document schemas
2. **Phase 2**: Update page schemas to use references
3. **Phase 3**: Create migration script
4. **Phase 4**: Update frontend queries
5. **Phase 5**: Train client on new structure

## Example Frontend Query

```javascript
// Fetch page with all referenced content
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

This approach provides a much better editorial experience and makes the CMS more maintainable long-term.
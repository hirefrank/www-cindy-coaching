# Modular Content Migration Guide

## Overview

The Sanity CMS has been refactored from monolithic page documents to a modular, reusable content structure. This provides a much better editorial experience and content reusability.

## What's Changed

### Before: Monolithic Structure
- Each page was one massive document
- All content embedded in a single document
- No content reusability
- Difficult to navigate in Sanity Studio

### After: Modular Structure
- Content broken into focused document types
- Pages reference reusable content
- Clean organization in Sanity Studio
- Easy to find and edit specific content

## New Content Types

### Documents (Reusable)
1. **Hero Sections** (`hero`)
   - Reusable hero banners
   - Can be used on multiple pages

2. **Services** (`service`)
   - Individual service offerings
   - Includes full descriptions, benefits, pricing

3. **Testimonials** (`testimonial`)
   - Client testimonials
   - Can be featured across pages

4. **CTA Blocks** (`ctaBlock`)
   - Call-to-action sections
   - Different styles and layouts

5. **Team Members** (`teamMember`)
   - Staff profiles
   - Credentials and specialties

6. **Resources** (`resource`)
   - Articles, guides, worksheets
   - Categorized and filterable

### Page Types
1. **Generic Pages** (`page`)
   - Flexible page builder
   - Mix and match sections

2. **Home Page** (`homePageNew`)
   - Specific home page structure
   - References modular content

3. **Site Settings** (`siteSettings`)
   - Global navigation
   - Footer content
   - Contact information

## Studio Organization

Your Sanity Studio sidebar now shows:
```
├── Pages
│   └── Home Page (New)
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
├── Resources (empty - ready for content)
└── Site Settings
    └── Cindy Romanzo Coaching
```

## How to Use

### Editing Existing Content
1. Navigate to the content type (e.g., "Services")
2. Click on the specific item to edit
3. Make changes and publish

### Adding New Content
1. Click "+" next to the content type
2. Fill in the fields
3. Publish when ready

### Building Pages
1. Go to Pages → Create new
2. Add sections by selecting from:
   - Hero references
   - Service grids
   - Testimonial sections
   - CTA blocks
   - Rich text content

## Frontend Integration

### Example Query (New Structure)
```javascript
const pageQuery = `*[_type == "homePageNew"][0]{
  seo,
  hero->{
    heading,
    subheading,
    // ... all hero fields
  },
  servicesSection{
    services[]->{
      title,
      shortDescription,
      // ... all service fields
    }
  },
  // ... other sections
}`
```

### Testing the New Structure
1. Visit `/index-modular` to see the new modular home page
2. Compare with the original at `/`
3. Once satisfied, replace the original

## Migration Status

✅ **Completed:**
- Created all new schemas
- Migrated sample content
- Created example frontend page

⏳ **Next Steps:**
1. Review content in Sanity Studio
2. Add any missing content
3. Update all frontend pages to use new queries
4. Remove old schemas once migration is complete

## Benefits

1. **Better Organization**: Find content quickly
2. **Reusability**: Use testimonials, CTAs across pages
3. **Scalability**: Easy to add new content types
4. **Performance**: Load only needed content
5. **Editorial UX**: Focused, manageable documents

## Troubleshooting

### Content Not Showing
- Ensure content is published (not just saved)
- Check references are properly linked
- Verify queries include all needed fields

### Missing Images
- Upload images directly in Sanity Studio
- Use the image field's upload button

### Need Help?
- Check query syntax in `index-modular.astro`
- Review schema definitions in `sanity/schemas/`
- Use Sanity's GROQ playground to test queries
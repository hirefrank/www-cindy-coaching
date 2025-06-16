export default {
  name: 'resourcesPage',
  title: 'Resources Page',
  type: 'document',
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo'
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Page Heading',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Page Description',
          type: 'text'
        }
      ]
    },
    {
      name: 'newsletter',
      title: 'Newsletter Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text'
        },
        {
          name: 'placeholder',
          title: 'Email Placeholder',
          type: 'string'
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string'
        }
      ]
    },
    {
      name: 'categoriesSection',
      title: 'Categories Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string'
        }
      ]
    },
    {
      name: 'ctaSection',
      title: 'CTA Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'CTA Heading',
          type: 'string'
        },
        {
          name: 'description',
          title: 'CTA Description',
          type: 'text'
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string'
        }
      ]
    }
  ]
}
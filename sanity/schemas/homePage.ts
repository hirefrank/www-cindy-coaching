export default {
  name: 'homePage',
  title: 'Home Page',
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
          title: 'Main Heading',
          type: 'string',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          rows: 3
        },
        {
          name: 'primaryButtonText',
          title: 'Primary Button Text',
          type: 'string'
        },
        {
          name: 'secondaryButtonText',
          title: 'Secondary Button Text',
          type: 'string'
        },
        {
          name: 'image',
          title: 'Hero Image',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'trustIndicators',
      title: 'Trust Indicators',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'label',
            title: 'Label',
            type: 'string'
          },
          {
            name: 'title',
            title: 'Title',
            type: 'string'
          },
          {
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string'
          }
        ]
      }]
    },
    {
      name: 'servicesSection',
      title: 'Services Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text'
        },
        {
          name: 'services',
          title: 'Services',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'icon',
                title: 'Icon Letter',
                type: 'string',
                validation: (Rule: any) => Rule.max(1)
              },
              {
                name: 'title',
                title: 'Service Title',
                type: 'string'
              },
              {
                name: 'description',
                title: 'Service Description',
                type: 'text',
                rows: 3
              },
              {
                name: 'linkText',
                title: 'Link Text',
                type: 'string'
              }
            ]
          }]
        }
      ]
    },
    {
      name: 'aboutSection',
      title: 'About Preview Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string'
        },
        {
          name: 'paragraphs',
          title: 'Content Paragraphs',
          type: 'array',
          of: [{type: 'text', rows: 3}]
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string'
        },
        {
          name: 'image',
          title: 'Section Image',
          type: 'image',
          options: {
            hotspot: true
          }
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
          name: 'primaryButtonText',
          title: 'Primary Button Text',
          type: 'string'
        },
        {
          name: 'secondaryButtonText',
          title: 'Secondary Button Text',
          type: 'string'
        }
      ]
    }
  ]
}
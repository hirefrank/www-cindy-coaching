export default {
  name: 'servicesPage',
  title: 'Services Page',
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
      name: 'serviceCategories',
      title: 'Service Categories',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'categoryTitle',
            title: 'Category Title',
            type: 'string'
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
                  type: 'text'
                },
                {
                  name: 'features',
                  title: 'Features/Benefits',
                  type: 'array',
                  of: [{type: 'string'}]
                },
                {
                  name: 'format',
                  title: 'Format/Duration',
                  type: 'string'
                }
              ]
            }]
          }
        ]
      }]
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
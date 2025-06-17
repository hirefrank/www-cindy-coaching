export default {
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Brief description for service cards'
    },
    {
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'}
            ]
          }
        }
      ]
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
      description: 'Icon or illustration for this service'
    },
    {
      name: 'benefits',
      title: 'Key Benefits',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of benefits (bullet points)'
    },
    {
      name: 'targetAudience',
      title: 'Target Audience',
      type: 'string',
      description: 'Who is this service for?'
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'Pricing information or "Contact for pricing"'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which services appear'
    },
    {
      name: 'featured',
      title: 'Featured Service',
      type: 'boolean',
      description: 'Show this service prominently'
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
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'shortDescription',
      media: 'icon'
    }
  }
}
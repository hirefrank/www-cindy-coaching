export default {
  name: 'servicesSection',
  title: 'Services Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'How I Can Help'
    },
    {
      name: 'subheading',
      title: 'Section Subheading',
      type: 'string'
    },
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'service'}]
        }
      ],
      validation: (Rule: any) => Rule.max(6)
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Grid (3 columns)', value: 'grid-3'},
          {title: 'Grid (2 columns)', value: 'grid-2'},
          {title: 'Cards', value: 'cards'},
          {title: 'List', value: 'list'}
        ]
      },
      initialValue: 'grid-3'
    }
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading'
    }
  }
}
export default {
  name: 'trustIndicators',
  title: 'Trust Indicators',
  type: 'object',
  fields: [
    {
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Users', value: 'users'},
                  {title: 'Star', value: 'star'},
                  {title: 'Award', value: 'award'},
                  {title: 'Clock', value: 'clock'},
                  {title: 'Check', value: 'check'}
                ]
              }
            }
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value'
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.max(4)
    },
    {
      name: 'showTestimonials',
      title: 'Show Mini Testimonials',
      type: 'boolean',
      description: 'Show a row of mini testimonials below stats'
    },
    {
      name: 'miniTestimonials',
      title: 'Mini Testimonials',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'testimonial'}]
        }
      ],
      hidden: ({parent}: any) => !parent?.showTestimonials,
      validation: (Rule: any) => Rule.max(3)
    }
  ],
  preview: {
    select: {
      statsCount: 'stats.length'
    },
    prepare({statsCount}: any) {
      return {
        title: 'Trust Indicators',
        subtitle: `${statsCount || 0} statistics`
      }
    }
  }
}
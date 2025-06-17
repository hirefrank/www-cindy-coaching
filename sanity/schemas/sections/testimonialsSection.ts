export default {
  name: 'testimonialsSection',
  title: 'Testimonials Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'What Clients Say'
    },
    {
      name: 'subheading',
      title: 'Section Subheading',
      type: 'string'
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'testimonial'}]
        }
      ]
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Carousel', value: 'carousel'},
          {title: 'Grid', value: 'grid'},
          {title: 'Masonry', value: 'masonry'}
        ]
      },
      initialValue: 'carousel'
    }
  ],
  preview: {
    select: {
      title: 'heading',
      testimonialCount: 'testimonials.length'
    },
    prepare({title, testimonialCount}: any) {
      return {
        title,
        subtitle: `${testimonialCount || 0} testimonials`
      }
    }
  }
}
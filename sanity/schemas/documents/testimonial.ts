export default {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'role',
      title: 'Role/Title',
      type: 'string',
      description: 'e.g., "Parent of ADHD Teen", "College Student"'
    },
    {
      name: 'content',
      title: 'Testimonial Content',
      type: 'text',
      rows: 5,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Optional photo of the person'
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule: any) => Rule.min(1).max(5),
      description: 'Star rating (1-5)'
    },
    {
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      description: 'Show this testimonial prominently'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number'
    }
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        {field: 'featured', direction: 'desc'},
        {field: 'order', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image'
    }
  }
}
export default {
  name: 'teamMember',
  title: 'Team Members',
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
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'}
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
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
      description: 'Brief bio for team cards'
    },
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'credentials',
      title: 'Credentials',
      type: 'array',
      of: [{type: 'string'}],
      description: 'e.g., "ICF Certified", "M.Ed.", "ADHD Specialist"'
    },
    {
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url'
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string'
        }
      ]
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0
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
      title: 'name',
      subtitle: 'role',
      media: 'image'
    }
  }
}
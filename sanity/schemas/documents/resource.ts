export default {
  name: 'resource',
  title: 'Resources',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'ADHD Management', value: 'adhd'},
          {title: 'Study Skills', value: 'study'},
          {title: 'Time Management', value: 'time'},
          {title: 'Organization', value: 'organization'},
          {title: 'Parent Resources', value: 'parent'},
          {title: 'Student Resources', value: 'student'}
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'type',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          {title: 'Article', value: 'article'},
          {title: 'Worksheet', value: 'worksheet'},
          {title: 'Guide', value: 'guide'},
          {title: 'Video', value: 'video'},
          {title: 'Tool', value: 'tool'}
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'}
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'downloadFile',
      title: 'Downloadable File',
      type: 'file',
      description: 'PDF, worksheet, or other downloadable resource'
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Link to external resource'
    },
    {
      name: 'featured',
      title: 'Featured Resource',
      type: 'boolean',
      description: 'Show this resource prominently'
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image'
    }
  }
}
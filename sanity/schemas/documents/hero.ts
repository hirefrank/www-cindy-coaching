export default {
  name: 'hero',
  title: 'Hero Sections',
  type: 'document',
  fields: [
    {
      name: 'internalTitle',
      title: 'Internal Title',
      type: 'string',
      description: 'For internal reference only (not displayed on site)',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
        }
      ]
    },
    {
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
        }
      ]
    },
    {
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ],
  preview: {
    select: {
      title: 'internalTitle',
      subtitle: 'heading',
      media: 'image'
    }
  }
}
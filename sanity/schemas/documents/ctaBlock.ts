export default {
  name: 'ctaBlock',
  title: 'CTA Blocks',
  type: 'document',
  fields: [
    {
      name: 'internalTitle',
      title: 'Internal Title',
      type: 'string',
      description: 'For internal reference only',
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
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'link',
              title: 'Button Link',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'style',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  {title: 'Primary', value: 'primary'},
                  {title: 'Secondary', value: 'secondary'},
                  {title: 'Outline', value: 'outline'}
                ]
              },
              initialValue: 'primary'
            }
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'link'
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.max(2)
    },
    {
      name: 'backgroundStyle',
      title: 'Background Style',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Gradient', value: 'gradient'},
          {title: 'Dark', value: 'dark'},
          {title: 'Light', value: 'light'}
        ]
      },
      initialValue: 'default'
    },
    {
      name: 'alignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Center', value: 'center'},
          {title: 'Left', value: 'left'}
        ]
      },
      initialValue: 'center'
    }
  ],
  preview: {
    select: {
      title: 'internalTitle',
      subtitle: 'heading'
    }
  }
}
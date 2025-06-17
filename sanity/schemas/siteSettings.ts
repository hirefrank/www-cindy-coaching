export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'navigation',
      title: 'Main Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'Use / for home, /about for about page, etc.',
              validation: (Rule: any) => Rule.required()
            }
          ]
        }
      ]
    },
    {
      name: 'footer',
      title: 'Footer Settings',
      type: 'object',
      fields: [
        {
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          initialValue: '© 2024 Cindy Romanzo Coaching. All rights reserved.'
        },
        {
          name: 'socialLinks',
          title: 'Social Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'platform',
                  title: 'Platform',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'LinkedIn', value: 'linkedin'},
                      {title: 'Facebook', value: 'facebook'},
                      {title: 'Instagram', value: 'instagram'},
                      {title: 'Twitter', value: 'twitter'}
                    ]
                  }
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'url'
                }
              ]
            }
          ]
        },
        {
          name: 'footerLinks',
          title: 'Footer Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string'
                },
                {
                  name: 'link',
                  title: 'Link',
                  type: 'string'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'string'
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string'
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 3
        },
        {
          name: 'calendlyUrl',
          title: 'Calendly URL',
          type: 'url'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
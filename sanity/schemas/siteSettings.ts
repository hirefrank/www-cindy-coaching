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
          name: 'aboutTitle',
          title: 'About Section Title',
          type: 'string',
          initialValue: 'Cindy Romanzo'
        },
        {
          name: 'aboutDescription',
          title: 'About Description',
          type: 'text',
          rows: 4,
          initialValue: 'Helping families navigate ADHD and autism with evidence-based coaching strategies.'
        },
        {
          name: 'credentials',
          title: 'Credentials',
          type: 'array',
          of: [{type: 'string'}],
          initialValue: [
            'ICF Associate Certified Coach (ACC)',
            'Licensed Physical Therapist (MPT)',
            'Certified ADHD Specialist (CAS)'
          ]
        },
        {
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          initialValue: '© 2024 Cindy Romanzo. All rights reserved.'
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
        },
        {
          name: 'location',
          title: 'Location',
          type: 'string',
          initialValue: 'Bergen County, NJ'
        }
      ]
    },
    {
      name: 'forms',
      title: 'Form Settings',
      type: 'object',
      fields: [
        {
          name: 'serviceOptions',
          title: 'Service Options for Contact Form',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                  validation: (Rule: any) => Rule.required()
                },
                {
                  name: 'label',
                  title: 'Display Label',
                  type: 'string',
                  validation: (Rule: any) => Rule.required()
                }
              ]
            }
          ],
          initialValue: [
            {value: 'parent-coaching', label: 'Parent Coaching'},
            {value: 'teen-coaching', label: 'Teen Coaching'},
            {value: 'family-consulting', label: 'Family Consulting'},
            {value: 'school-support', label: 'School Support'},
            {value: 'workshops', label: 'Workshops & Training'},
            {value: 'other', label: 'Other'}
          ]
        }
      ]
    },
    {
      name: 'buttons',
      title: 'Global Button Labels',
      type: 'object',
      fields: [
        {
          name: 'scheduleConsultation',
          title: 'Schedule Consultation Button',
          type: 'string',
          initialValue: 'Schedule Consultation'
        },
        {
          name: 'scheduleOfficeHours',
          title: 'Schedule Office Hours Button',
          type: 'string',
          initialValue: 'Schedule Office Hours'
        }
      ]
    },
    {
      name: 'errorPages',
      title: 'Error Page Content',
      type: 'object',
      fields: [
        {
          name: 'error404',
          title: '404 Error Page',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              initialValue: '404'
            },
            {
              name: 'message',
              title: 'Message',
              type: 'string',
              initialValue: 'Oops! Page not found'
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              initialValue: 'The page you are looking for might have been moved or deleted.'
            },
            {
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Return to Home'
            }
          ]
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
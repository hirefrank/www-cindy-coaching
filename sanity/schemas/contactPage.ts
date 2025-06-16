export default {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo'
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Page Heading',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Page Description',
          type: 'text'
        }
      ]
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string'
        },
        {
          name: 'email',
          title: 'Email',
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string'
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string'
            },
            {
              name: 'value',
              title: 'Email Address',
              type: 'string'
            }
          ]
        },
        {
          name: 'location',
          title: 'Location',
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string'
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string'
            },
            {
              name: 'value',
              title: 'Location',
              type: 'string'
            }
          ]
        },
        {
          name: 'hours',
          title: 'Office Hours',
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string'
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string'
            },
            {
              name: 'regularHours',
              title: 'Regular Hours',
              type: 'string'
            },
            {
              name: 'additionalInfo',
              title: 'Additional Info',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'schedulingSection',
      title: 'Scheduling Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string'
        },
        {
          name: 'options',
          title: 'Scheduling Options',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Option Title',
                type: 'string'
              },
              {
                name: 'description',
                title: 'Description',
                type: 'text'
              },
              {
                name: 'buttonText',
                title: 'Button Text',
                type: 'string'
              },
              {
                name: 'calendlyLink',
                title: 'Calendly Link',
                type: 'string'
              }
            ]
          }]
        }
      ]
    },
    {
      name: 'faq',
      title: 'FAQ Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string'
        },
        {
          name: 'questions',
          title: 'Questions',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'question',
                title: 'Question',
                type: 'string'
              },
              {
                name: 'answer',
                title: 'Answer',
                type: 'text'
              }
            ]
          }]
        }
      ]
    },
    {
      name: 'ctaSection',
      title: 'CTA Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'CTA Heading',
          type: 'string'
        },
        {
          name: 'description',
          title: 'CTA Description',
          type: 'text'
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string'
        }
      ]
    }
  ]
}
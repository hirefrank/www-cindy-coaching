export default {
  name: 'aboutPage',
  title: 'About Page',
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
      name: 'personalJourney',
      title: 'Personal Journey Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string'
        },
        {
          name: 'paragraphs',
          title: 'Content',
          type: 'array',
          of: [{type: 'text', rows: 3}]
        },
        {
          name: 'image',
          title: 'Section Image',
          type: 'image',
          options: { hotspot: true }
        }
      ]
    },
    {
      name: 'professionalEvolution',
      title: 'Professional Evolution Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string'
        },
        {
          name: 'paragraphs',
          title: 'Content',
          type: 'array',
          of: [{type: 'text', rows: 3}]
        },
        {
          name: 'image',
          title: 'Section Image',
          type: 'image',
          options: { hotspot: true }
        }
      ]
    },
    {
      name: 'credentials',
      title: 'Credentials & Training',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text'
        },
        {
          name: 'certifications',
          title: 'Certifications',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'abbreviation',
                title: 'Abbreviation',
                type: 'string'
              },
              {
                name: 'title',
                title: 'Certification Title',
                type: 'string'
              },
              {
                name: 'description',
                title: 'Description',
                type: 'text'
              }
            ]
          }]
        },
        {
          name: 'continuingEducation',
          title: 'Continuing Education',
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string'
            },
            {
              name: 'items',
              title: 'Education Items',
              type: 'array',
              of: [{type: 'string'}]
            }
          ]
        }
      ]
    },
    {
      name: 'approach',
      title: 'Approach & Philosophy',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text'
        },
        {
          name: 'principles',
          title: 'Principles',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Principle Title',
                type: 'string'
              },
              {
                name: 'description',
                title: 'Description',
                type: 'text'
              }
            ]
          }]
        }
      ]
    },
    {
      name: 'personal',
      title: 'Personal Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text'
        },
        {
          name: 'interests',
          title: 'Interests',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'emoji',
                title: 'Emoji',
                type: 'string'
              },
              {
                name: 'label',
                title: 'Label',
                type: 'string'
              }
            ]
          }]
        },
        {
          name: 'conclusion',
          title: 'Conclusion Text',
          type: 'text'
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
          name: 'primaryButtonText',
          title: 'Primary Button Text',
          type: 'string'
        },
        {
          name: 'secondaryButtonText',
          title: 'Secondary Button Text',
          type: 'string'
        }
      ]
    }
  ]
}
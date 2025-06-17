// Generic page builder schema
export default {
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
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
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'reference',
      to: [{type: 'hero'}],
      description: 'Optional hero section for this page'
    },
    {
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        {
          name: 'heroRef',
          title: 'Hero Section',
          type: 'reference',
          to: [{type: 'hero'}]
        },
        {
          name: 'servicesSection',
          title: 'Services Section',
          type: 'servicesSection'
        },
        {
          name: 'testimonialsSection',
          title: 'Testimonials Section',
          type: 'testimonialsSection'
        },
        {
          name: 'aboutSection',
          title: 'About Section',
          type: 'aboutSection'
        },
        {
          name: 'trustIndicators',
          title: 'Trust Indicators',
          type: 'trustIndicators'
        },
        {
          name: 'ctaRef',
          title: 'CTA Block',
          type: 'reference',
          to: [{type: 'ctaBlock'}]
        },
        {
          name: 'richText',
          title: 'Rich Text Content',
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string'
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
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current'
    },
    prepare({title, slug}: any) {
      return {
        title,
        subtitle: slug ? `/${slug}` : 'No slug'
      }
    }
  }
}
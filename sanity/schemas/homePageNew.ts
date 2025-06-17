// Simplified home page schema using references
export default {
  name: 'homePageNew',
  title: 'Home Page (New)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Home',
      readOnly: true
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
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'trustIndicators',
      title: 'Trust Indicators',
      type: 'trustIndicators'
    },
    {
      name: 'servicesSection',
      title: 'Services Section',
      type: 'servicesSection'
    },
    {
      name: 'aboutSection',
      title: 'About Section',
      type: 'aboutSection'
    },
    {
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'testimonialsSection'
    },
    {
      name: 'ctaSection',
      title: 'CTA Section',
      type: 'reference',
      to: [{type: 'ctaBlock'}]
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare() {
      return {
        title: 'Home Page'
      }
    }
  }
}
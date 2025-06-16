export default {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.max(60).warning('Titles should be under 60 characters')
    },
    {
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.max(160).warning('Meta descriptions should be under 160 characters')
    },
    {
      name: 'image',
      title: 'Social Share Image',
      type: 'image'
    }
  ]
}
export default {
  name: 'aboutSection',
  title: 'About Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'About'
    },
    {
      name: 'teamMember',
      title: 'Team Member',
      type: 'reference',
      to: [{type: 'teamMember'}],
      description: 'Select which team member to feature'
    },
    {
      name: 'content',
      title: 'Additional Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
          ]
        }
      ]
    },
    {
      name: 'ctaButton',
      title: 'CTA Button',
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
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Image Left', value: 'image-left'},
          {title: 'Image Right', value: 'image-right'},
          {title: 'Full Width', value: 'full-width'}
        ]
      },
      initialValue: 'image-left'
    }
  ],
  preview: {
    select: {
      title: 'heading',
      teamMember: 'teamMember.name',
      media: 'teamMember.image'
    },
    prepare({title, teamMember, media}: any) {
      return {
        title,
        subtitle: teamMember ? `Featuring ${teamMember}` : 'No team member selected',
        media
      }
    }
  }
}
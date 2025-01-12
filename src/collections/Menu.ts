import type { CollectionConfig } from 'payload'

export const Menus: CollectionConfig = {
  slug: 'menus',
  fields: [
    {
      name: 'branch',
      type: 'relationship',
      relationTo: 'branches',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          type: 'upload', 
          relationTo: 'media', 
        },
      ],
    },
  ],
}

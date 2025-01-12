import type { CollectionConfig } from 'payload'

const Orders: CollectionConfig = {
  slug: 'orders',
  fields: [
    {
      name: 'userLocation',
      type: 'point', // User's latitude and longitude
      required: true,
    },
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
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'paymentMethod',
      type: 'select',
      options: [
        { value: 'cash', label: 'Cash' },
        { value: 'card', label: 'Card' },
      ],
      required: true,
    },
  ],
}

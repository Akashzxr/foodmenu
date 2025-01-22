import { CollectionConfig } from 'payload';

export const Items: CollectionConfig = {
  slug: 'items', // API endpoint slug (e.g., /api/items)
  labels: {
    singular: 'Item',
    plural: 'Items',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name', // Field for the item name
      type: 'text',
      required: true, // Make the field mandatory
    },
    {
      name: 'type', // Field for the item type
      type: 'text',
      required: true,
    },
    {
      name: 'price', // Field for the item price
      type: 'number',
      required: true,
      admin: {
        step: 0.01, // Allow decimal input (e.g., 12.99)
      },
    },
    {
      name: 'offerPrice', // Field for the item price
      type: 'number',
      required: false,
      admin: {
        step: 0.01, // Allow decimal input (e.g., 12.99)
      },
    },
    {
      name: 'description', // Field for the item description
      type: 'textarea',
      required: true,
    },
    {
      name: 'image', // Field for uploading an item image
      type: 'upload',
      relationTo: 'media', // Relate to the media collection (or any upload collection you have)
    },
    {
      name: 'branches', // Field for selecting multiple branches
      type: 'relationship',
      relationTo: 'branches', // Relate to the branches collection
      hasMany: true, // Enable selecting multiple branches
      required: true,
    },
  ],
  access: {
    // Example access control
    read: () => true, // Allow public read access
  },
};

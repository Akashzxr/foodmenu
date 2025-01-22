import type { CollectionConfig } from 'payload'

export const Branches: CollectionConfig = {
    slug: 'branches',
    admin: {
      useAsTitle: 'name',
    },
    fields: [
      {
        name: 'name',
        type: 'text',
        required: true,
      },
      {
        name: 'location',
        type: 'point', // To store latitude and longitude
        required: true,
        
      },
      {
        name: 'radius',
        type: 'number', // Specify the radius (in km)
        required: true,
        defaultValue: 20,
      },
    ],
    access: {
      // Allow public read access
      read: () => true,
    },
  };
  
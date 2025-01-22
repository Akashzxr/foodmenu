import { CollectionConfig } from 'payload';

const Media: CollectionConfig = {
  slug: 'media', // Unique identifier for the collection
  upload: {
    staticDir: 'media',  // The directory where media files are stored
    mimeTypes: ['image/*'], // Restrict uploads to image files only
  },
  fields: [
    {
      name: 'altText',
      type: 'text',
      label: 'Alt Text',
      required: true,
    },
  ],
  access: {
    // Allow public read access
    read: () => true,
  },
};

export default Media;

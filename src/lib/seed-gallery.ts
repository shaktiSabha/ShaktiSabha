import connectDB from './mongodb';
import Gallery from '@/models/Gallery';

const sampleGalleryData = [
  {
    title: 'Women Empowerment Workshop',
    description: 'A powerful session on building confidence and leadership skills for women in our community. Participants learned essential techniques for personal and professional growth.',
    imageUrl: '/banner1.jpg',
    imagePublicId: 'shakti-sabha-gallery/workshop-1',
    category: 'Workshops',
    alt: 'Women participating in empowerment workshop',
    status: 'published',
    featured: true,
    views: 245
  },
  {
    title: 'Self Defense Training Session',
    description: 'Learning essential self-defense techniques to ensure personal safety and build confidence. Expert trainers guided participants through practical exercises.',
    imageUrl: '/banner2.jpg',
    imagePublicId: 'shakti-sabha-gallery/training-1',
    category: 'Training',
    alt: 'Self defense training session',
    status: 'published',
    featured: false,
    views: 189
  },
  {
    title: 'Community Gathering 2024',
    description: 'Our annual community meeting where women share experiences and support each other. A platform for networking and mutual empowerment.',
    imageUrl: '/banner3.jpg',
    imagePublicId: 'shakti-sabha-gallery/community-1',
    category: 'Community',
    alt: 'Women community gathering',
    status: 'published',
    featured: true,
    views: 312
  },
  {
    title: 'Leadership Conference',
    description: 'Inspiring talks and workshops focused on developing leadership qualities among women. Industry experts shared valuable insights and strategies.',
    imageUrl: '/banner4.jpg',
    imagePublicId: 'shakti-sabha-gallery/conference-1',
    category: 'Conferences',
    alt: 'Women leadership conference',
    status: 'published',
    featured: false,
    views: 198
  },
  {
    title: 'Health & Wellness Event',
    description: 'Promoting physical and mental health awareness through interactive sessions and activities. Focus on holistic wellbeing for women.',
    imageUrl: '/banner5.jpg',
    imagePublicId: 'shakti-sabha-gallery/event-1',
    category: 'Events',
    alt: 'Health and wellness event',
    status: 'published',
    featured: false,
    views: 156
  },
  {
    title: 'Skill Development Workshop',
    description: 'Hands-on training sessions to develop professional and personal skills. Covering digital literacy, communication, and entrepreneurship.',
    imageUrl: '/banner6.jpg',
    imagePublicId: 'shakti-sabha-gallery/workshop-2',
    category: 'Workshops',
    alt: 'Skill development workshop',
    status: 'published',
    featured: false,
    views: 134
  }
];

export async function seedGallery() {
  try {
    await connectDB();
    
    // Check if gallery data already exists
    const existingItems = await Gallery.countDocuments();
    
    if (existingItems > 0) {
      console.log(`Gallery already has ${existingItems} items. Skipping seed.`);
      return;
    }
    
    // Insert sample data
    await Gallery.insertMany(sampleGalleryData);
    console.log('Gallery seeded successfully with sample data!');
    
  } catch (error) {
    console.error('Error seeding gallery:', error);
    throw error;
  }
}

// Run this script to seed the database
if (require.main === module) {
  seedGallery()
    .then(() => {
      console.log('Gallery seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Gallery seeding failed:', error);
      process.exit(1);
    });
} 
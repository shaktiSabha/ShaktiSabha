import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env') });

// Dynamic imports for ES modules
const Blog = (await import('../src/models/Blog.js')).default;
const Testimonial = (await import('../src/models/Testimonial.js')).default;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shakti-sabha';

async function migrateImages() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Update all blogs with old Unsplash URLs
        const blogResult = await Blog.updateMany(
            { imageUrl: { $regex: 'source.unsplash.com' } },
            { $set: { imageUrl: 'https://picsum.photos/600/400' } }
        );
        console.log(`Updated ${blogResult.modifiedCount} blog(s)`);

        // Update all testimonials with old Unsplash URLs
        const testimonialResult = await Testimonial.updateMany(
            { imageUrl: { $regex: 'source.unsplash.com' } },
            { $set: { imageUrl: 'https://picsum.photos/150/150' } }
        );
        console.log(`Updated ${testimonialResult.modifiedCount} testimonial(s)`);

        console.log('Migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrateImages();

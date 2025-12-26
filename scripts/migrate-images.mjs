import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI not found in environment variables');
    process.exit(1);
}

console.log('Connecting to MongoDB...');

const blogSchema = new mongoose.Schema({}, { strict: false });
const testimonialSchema = new mongoose.Schema({}, { strict: false });

const Blog = mongoose.model('Blog', blogSchema);
const Testimonial = mongoose.model('Testimonial', testimonialSchema);

async function migrateImages() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB successfully');

        const blogResult = await Blog.updateMany(
            { imageUrl: { $regex: 'picsum.photos|source.unsplash.com' } },
            { $set: { imageUrl: '/placeholder-blog.svg' } }
        );
        console.log(`✓ Updated ${blogResult.modifiedCount} blog(s)`);

        const testimonialResult = await Testimonial.updateMany(
            { imageUrl: { $regex: 'picsum.photos|source.unsplash.com' } },
            { $set: { imageUrl: '/placeholder-testimonial.svg' } }
        );
        console.log(`✓ Updated ${testimonialResult.modifiedCount} testimonial(s)`);

        console.log('\n✓ Migration completed successfully!');
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('✗ Migration failed:', error.message);
        process.exit(1);
    }
}

migrateImages();

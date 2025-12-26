import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';

// Load environment variables
config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Testing Cloudinary Configuration...\n');

// Check if credentials are loaded
console.log('Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? '✓ Set' : '✗ Missing');
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '✓ Set' : '✗ Missing');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '✓ Set' : '✗ Missing');

if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET) {
    console.error('\n❌ Missing Cloudinary credentials in .env file');
    process.exit(1);
}

console.log('\n📡 Testing Cloudinary API connection...');

try {
    // Test API connection by fetching account details
    const result = await cloudinary.api.ping();
    console.log('✅ Cloudinary API connection successful!');
    console.log('Status:', result.status);

    // Get usage information
    const usage = await cloudinary.api.usage();
    console.log('\n📊 Account Usage:');
    console.log('Plan:', usage.plan);
    console.log('Credits used:', usage.credits?.usage || 0);
    console.log('Credits limit:', usage.credits?.limit || 'N/A');
    console.log('Bandwidth used:', Math.round((usage.bandwidth?.usage || 0) / 1024 / 1024), 'MB');
    console.log('Storage used:', Math.round((usage.storage?.usage || 0) / 1024 / 1024), 'MB');

    console.log('\n✅ All tests passed! Cloudinary is configured correctly.');
} catch (error) {
    console.error('\n❌ Cloudinary API test failed:');
    console.error('Error:', error.message);
    if (error.http_code) {
        console.error('HTTP Code:', error.http_code);
    }

    console.log('\n🔍 Troubleshooting tips:');
    console.log('1. Verify your credentials at https://cloudinary.com/console');
    console.log('2. Check if your account is active and not suspended');
    console.log('3. Ensure API key and secret are correct (no extra spaces)');
    console.log('4. Try regenerating your API secret in Cloudinary dashboard');

    process.exit(1);
}

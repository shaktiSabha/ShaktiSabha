import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Gallery - Shakti Sabha',
  description: 'Gallery showcasing our events, workshops, and community activities',
  keywords: [
    'women empowerment',
    'self defense workshops',
    'community events',
    'training sessions',
    'Shakti Sabha gallery'
  ],
  openGraph: {
    title: 'Shakti Sabha Gallery',
    description: 'Explore our journey of empowering women through visual stories',
    images: [{
      url: '/gallery/og-cover.jpg',
      width: 1200,
      height: 630,
      alt: 'Shakti Sabha Gallery'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shakti Sabha Gallery',
    description: 'Witness our mission of women empowerment through visual stories',
    images: ['/gallery/twitter-cover.jpg']
  }
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative min-h-screen">
      {/* Optional: Add a background pattern or gradient */}
      <div className="absolute inset-0 " />
      
      {children}
    </section>
  );
}
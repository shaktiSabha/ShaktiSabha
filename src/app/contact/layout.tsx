import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Shakti Sabha',
  description: 'Reach out to Shakti Sabha for support, collaboration, or emergencies. Our team is available 24/7 to assist you.',
  keywords: [
    'contact Shakti Sabha',
    'women helpline',
    'emergency support',
    'women safety contact',
    'get help',
    'report incident',
    'support hotline'
  ],
  openGraph: {
    title: 'Contact Shakti Sabha - 24/7 Support Available',
    description: 'Need help? Contact our team for immediate support and assistance.',
    images: [{
      url: '/contact/contact-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Contact Shakti Sabha'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Shakti Sabha',
    description: 'Get immediate support and assistance',
    images: ['/contact/contact-twitter.jpg']
  },
  alternates: {
    canonical: 'https://shaktisabha.org/contact'
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black/50 to-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {children}
      </div>
    </section>
  );
}
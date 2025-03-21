import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Podcasts & Media - Shakti Sabha',
  description: 'Enlightening conversations and empowering content from inspiring speakers'
};

export default function PodcastsMediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
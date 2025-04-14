import { Metadata } from 'next';

// Define metadata for the page
export const metadata: Metadata = {
  title: 'Support Groups | Your App Name',
  description: 'Find and join support groups to connect with others.',
};

export default function PodcastsMediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
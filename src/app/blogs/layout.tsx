import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs - Shakti Sabha',
  description: 'Explore stories of women empowerment, knowledge, and transformation'
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
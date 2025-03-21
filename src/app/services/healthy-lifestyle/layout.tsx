import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health & Lifestyle - Shakti Sabha',
  description: 'Discover holistic approaches to health, wellness, and balanced living'
};

export default function HealthAndLifestyleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services - Shakti Sabha',
  description: 'Explore our comprehensive range of services designed to empower women'
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
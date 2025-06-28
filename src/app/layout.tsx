import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from './context/ThemeProvider';
import ConditionalLayout from "./components/ConditionalLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'),
  title: {
    default: "Shakti Sabha",
    template: "%s | Shakti Sabha"
  },
  description: "Empowering women through education, training, and community support. Join Shakti Sabha for self-defense, workshops, and personal growth.",
  keywords: ["women empowerment", "self defense", "workshops", "community", "training", "leadership"],
  authors: [{ name: "Shakti Sabha Team" }],
  creator: "Shakti Sabha",
  publisher: "Shakti Sabha",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Shakti Sabha - Empowering Women",
    description: "Empowering women through education, training, and community support. Join Shakti Sabha for self-defense, workshops, and personal growth.",
    siteName: "Shakti Sabha",
    images: [
      {
        url: "/shaktsabhaaa.jpg",
        width: 1200,
        height: 630,
        alt: "Shakti Sabha - Empowering Women",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shakti Sabha - Empowering Women",
    description: "Empowering women through education, training, and community support.",
    images: ["/shaktsabhaaa.jpg"],
    creator: "@shaktisabha",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}>
        <ThemeProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}

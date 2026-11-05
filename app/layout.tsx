import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { DEFAULT_OG_IMAGE, PUBLISHER_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} – Market Briefings & Trading Education`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: PUBLISHER_NAME }],
  // No canonical here: it would be inherited by every page. Each page sets its own.
  alternates: {
    types: { 'application/rss+xml': [{ url: '/rss.xml', title: `${SITE_NAME} – News & Blogs` }] },
  },
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: { card: 'summary_large_image' },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

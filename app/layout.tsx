import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    template: '%s | DerivionAcademy.in',
    default: 'DerivionAcademy.in – Institutional Intelligence & Quantitative Analysis',
  },
  description: 'DerivionAcademy.in is an authoritative digital chronicle and research bureau providing institutional analysis, quantitative intelligence, and sovereign market intelligence.',
  keywords: ['sovereign debt', 'quantitative analysis', 'institutional intelligence', 'geopolitics', 'monetary policy'],
  authors: [{ name: 'DerivionAcademy Editorial Board' }],
  openGraph: {
    siteName: 'DerivionAcademy.in',
    type: 'website',
  },
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

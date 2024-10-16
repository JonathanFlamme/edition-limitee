import type { Metadata } from 'next';
import '@/styles/globals.css';
import { shadowsIntoLight } from '@/src/utils/font';
import SessionWrapper from '@/src/app/SessionWrapper';
import { Toaster } from 'sonner';
import Header from './header/Header';
import Footer from '../components/home/footer';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import QueryClientWrapper from './QueryClientWrapper';
import { usePathname } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edition Limitée',
  description: 'Guilde World of Warcraft sur Elune',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={shadowsIntoLight.className} suppressHydrationWarning={true}>
        <SessionWrapper>
          <QueryClientWrapper>
            <Toaster richColors closeButton />
            <Header />
            {children}
            <Footer />
          </QueryClientWrapper>
        </SessionWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import '@/styles/globals.css';
import { shadowsIntoLight } from '@/src/utils/font';
import SessionWrapper from '@/src/app/SessionWrapper';
import { Toaster } from 'sonner';
import { Providers } from './provider';
import Header from './header';
import Footer from '../components/home/footer';

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
    <SessionWrapper>
      <html lang="fr">
        <body className={shadowsIntoLight.className} suppressHydrationWarning={true}>
          <Toaster richColors closeButton />
          <main>
            <Header />
            {children}
            <Footer />
          </main>
        </body>
      </html>
    </SessionWrapper>
  );
}

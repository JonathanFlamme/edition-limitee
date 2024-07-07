import type { Metadata } from 'next';
import '@/styles/globals.css';
import { shadowsIntoLight } from '@/src/utils/font';
import SessionWrapper from '@/src/app/SessionWrapper';
import { Toaster } from 'sonner';
import { Providers } from './provider';

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
          <Providers>
            <Toaster richColors closeButton />
            {children}
          </Providers>
        </body>
      </html>
    </SessionWrapper>
  );
}

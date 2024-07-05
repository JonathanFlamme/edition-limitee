import type { Metadata } from 'next';
import '../styles/globals.css';
import { shadowsIntoLight } from '@/utils/font';
import SessionWrapper from './components/SessionWrapper';
import { StyledEngineProvider } from '@mui/material/styles';
import { Toaster } from 'sonner';

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
        <body className={shadowsIntoLight.className}>
          <StyledEngineProvider injectFirst>
            <Toaster richColors closeButton />
            {children}
          </StyledEngineProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}

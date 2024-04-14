import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <header className="bg-gray-700 text-white text-2xl  w-full fixed top-0 z-10">
          <div className="flex gap-10 justify-center py-7">
            <a href="#presentation">Présentation</a>
            <a href="#postuler">Postuler</a>
            <a href="#charte">Charte de la guilde</a>
            <a href="#contact">Contact</a>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

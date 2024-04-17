import type { Metadata } from 'next';
import '../styles/globals.css';
import { jost, shadowsIntoLight } from '@/utils/font';

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
      <body className={shadowsIntoLight.className}>
        <header
          className={`${shadowsIntoLight.className}  bg-gray-700 text-white text-2xl  w-full fixed top-0 z-10 `}
        >
          <div className="flex gap-10 justify-center py-7">
            <a href="#presentation">Présentation</a>
            <a href="#postuler">Postuler</a>
            <a href="#charte">Charte de la guilde</a>
            <a href="#galerie">Galerie</a>
            <a href="#contact">Contact</a>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import Image from 'next/image';
import '../styles/globals.css';
import { shadowsIntoLight } from '@/utils/font';
import logo_guilde_blanc from '../public/logo_guilde_blanc.png';

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
          className={`${shadowsIntoLight.className} fixed bg-gray-700 bg-opacity-50 text-white text-2xl  w-full fixed top-0 z-10 `}
        >
          <a href="#acceuil">
            <Image
              className="absolute t-0 left-10"
              src={logo_guilde_blanc}
              alt="logo"
              width={80}
              height={80}
            />
          </a>
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

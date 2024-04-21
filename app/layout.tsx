import type { Metadata } from 'next';
import Image from 'next/image';
import '../styles/globals.css';
import { shadowsIntoLight } from '@/utils/font';
import logo_guilde_blanc from '../public/logo_guilde_blanc.png';
import { useState } from 'react';
import Header from './header';

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
        <Header />
        {children}
      </body>
    </html>
  );
}

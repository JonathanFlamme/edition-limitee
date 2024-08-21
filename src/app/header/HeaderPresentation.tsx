'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import logo_guilde_blanc from '@/public/logo_guilde_blanc.png';
import { shadowsIntoLight } from '@/src/utils/font';
import { Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Login from '@/src/components/profile/Login';

export default function HeaderPresentation() {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  function handleSmoothScroll(event: React.MouseEvent, sectionId: string) {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
    setShowMenu(false);
  }

  const menuItems = [
    { id: 'presentation', label: 'Présentation' },
    { id: 'postuler', label: 'Postuler' },
    { id: 'charte', label: 'Charte de la guilde' },
    { id: 'galerie', label: 'Galerie' },
    { id: 'contact', label: 'Contact' },
  ];

  function renderMenuItems() {
    return menuItems.map((item) => (
      <Link
        key={item.id}
        href={`#${item.id}`}
        onClick={(event) => handleSmoothScroll(event, item.id)}
        className={pathname === `/${item.id}` ? 'font-bold text-[#33AFCF]' : ''}
      >
        {item.label}
      </Link>
    ));
  }

  return (
    <header
      className={`${shadowsIntoLight.className} fixed text-white text-2xl w-full top-0 z-10 flex justify-between md:bg-gray-700 md:bg-opacity-30 md:px-9 md:backdrop-blur-sm`}
    >
      {/* Menu burger */}
      <div className="md:hidden z-30">
        <button className="text-white p-4" onClick={() => setShowMenu(!showMenu)}>
          {!showMenu ? (
            <Menu className="text-white" width={25} />
          ) : (
            <X className="text-white" width={25} />
          )}
        </button>
      </div>
      <div>
        <Image
          className="absolute t-0 left-1/2 transform -translate-x-1/2 md:relative md:pt-2 cursor-pointer"
          src={logo_guilde_blanc}
          alt="logo"
          width={80}
          height={80}
          onClick={() => router.push('/')}
        />
      </div>
      {/* Affichage du menu */}
      {showMenu && (
        <div className="absolute top-0 w-screen h-screen bg-black z-20 flex flex-col items-center gap-4 pt-28">
          {renderMenuItems()}
        </div>
      )}
      <div className="hidden md:flex gap-10 justify-center py-7">{renderMenuItems()}</div>
      <Login />
    </header>
  );
}

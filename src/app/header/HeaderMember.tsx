'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import logo_guilde_blanc from '@/public/logo_guilde_blanc.png';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Login from '@/src/components/profile/Login';
import { useSession } from 'next-auth/react';
import { Role } from '@/@type/role.enum';

export default function HeaderMember() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'rosters', label: 'Membres' },
    { id: 'mythic-plus', label: 'Mythiques +' },
  ];

  function renderMenuItems() {
    return menuItems.map((item) => (
      <Link
        key={item.id}
        href={`/${item.id}`}
        className={pathname === `/${item.id}` ? 'font-bold text-[#33AFCF]' : ''}
      >
        {item.label}
      </Link>
    ));
  }

  return (
    <header className="fixed text-white text-lg w-full h-16 flex justify-between bg-gray-700 bg-opacity-30 md:px-9 backdrop-blur-sm">
      {/* Menu burger */}
      <div className="md:hidden z-50"></div>
      <div>
        <Image
          className="absolute left-1/2 transform -translate-x-1/2 md:relative pt-2 cursor-pointer"
          src={logo_guilde_blanc}
          alt="logo"
          width={45}
          height={45}
          onClick={() => router.push('/')}
        />
      </div>
      {/* Affichage du menu */}
      <div className="hidden md:flex text-xl gap-10 justify-center items-center">
        {renderMenuItems()}
        {session?.character.role === Role.Officier ? (
          <Link
            href="/settings"
            className={pathname === '/settings' ? 'font-bold text-[#33AFCF]' : ''}
          >
            Paramétres
          </Link>
        ) : null}
      </div>
      <Login />
    </header>
  );
}

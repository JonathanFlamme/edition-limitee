'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import logo_guilde_blanc from '@/public/logo_guilde_blanc.png';
import { shadowsIntoLight } from '@/src/utils/font';
import Login from '../components/profile/Login';
import { Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  function handleSmoothScroll(event: React.MouseEvent, sectionId: string) {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  }

  function renderMenuBurger() {
    switch (pathname) {
      case '/':
        return (
          <>
            <li>
              <a href="#presentation" onClick={(e) => handleSmoothScroll(e, 'presentation')}>
                Présentation
              </a>
            </li>
            <li>
              <a href="#postuler" onClick={(e) => handleSmoothScroll(e, 'postuler')}>
                Postuler
              </a>
            </li>
            <li>
              <a href="#charte" onClick={(e) => handleSmoothScroll(e, 'charte')}>
                Charte de la guilde
              </a>
            </li>
            <li>
              <a href="#galerie" onClick={(e) => handleSmoothScroll(e, 'galerie')}>
                Galerie
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')}>
                Contact
              </a>
            </li>
          </>
        );
      case '/settings':
        return <p>Paramètres</p>;
      case '/mythic-plus':
        return <p>Mythique +</p>;
      case '/rosters':
        return <p>Rosters</p>;
      default:
        return <p>Page non trouvé</p>;
    }
  }

  function renderNavHeader() {
    switch (pathname) {
      case '/':
        return (
          <>
            <Link
              href="#presentation"
              onClick={(event) => handleSmoothScroll(event, 'presentation')}
            >
              Présentation
            </Link>
            <Link href="#postuler" onClick={(event) => handleSmoothScroll(event, 'postuler')}>
              Postuler
            </Link>
            <Link href="#charte" onClick={(event) => handleSmoothScroll(event, 'charte')}>
              Charte de la guilde
            </Link>
            <Link href="#galerie" onClick={(event) => handleSmoothScroll(event, 'galerie')}>
              Galerie
            </Link>
            <Link href="#contact" onClick={(event) => handleSmoothScroll(event, 'contact')}>
              Contact
            </Link>
          </>
        );
      case '/settings':
        return (
          <>
            <Link href="/">Acceuil</Link>
            <p>Paramètres</p>
          </>
        );
      case '/mythic-plus':
        return (
          <>
            <Link href="/">Acceuil</Link>
            <p>Mythique +</p>
          </>
        );
      case '/rosters':
        return (
          <>
            <Link href="/">Acceuil</Link>
            <p>Rosters</p>
          </>
        );
      default:
        return <p>Page non trouvé</p>;
    }
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
        <div className="absolute top-0 w-screen h-screen bg-black z-20">
          <div className="flex justify-start md:hidden z-30">
            <button className="text-white p-4" onClick={() => setShowMenu(!showMenu)}>
              {!showMenu ? (
                <Menu className="text-white" width={25} />
              ) : (
                <X className="text-white" width={25} />
              )}
            </button>
          </div>
          <ul className="flex  flex-col gap-5  items-center pt-28 text-white text-3xl">
            {renderMenuBurger()}
          </ul>
        </div>
      )}
      <div className="hidden md:flex gap-10 justify-center py-7">{renderNavHeader()}</div>
      <Login />
    </header>
  );
}

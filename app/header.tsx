'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import logo_guilde_blanc from '../public/logo_guilde_blanc.png';
import { shadowsIntoLight } from '@/utils/font';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import Login from './components/Login';

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header
      className={`${shadowsIntoLight.className} fixed text-white text-2xl w-full top-0 z-10 flex justify-between md:bg-gray-700 md:bg-opacity-30 md:px-9`}
    >
      {/* Menu burger */}
      <div className="md:hidden z-30">
        <button className="text-white p-4" onClick={() => setShowMenu(!showMenu)}>
          {!showMenu ? (
            <FontAwesomeIcon className="text-white" width={25} icon={faBars} />
          ) : (
            <FontAwesomeIcon className="text-white" width={25} icon={faX} />
          )}
        </button>
      </div>
      <a href="#acceuil">
        <Image
          className="absolute t-0 left-1/2 transform -translate-x-1/2 md:relative md:pt-2"
          src={logo_guilde_blanc}
          alt="logo"
          width={80}
          height={80}
        />
      </a>
      {/* Affichage du menu */}
      {showMenu && (
        <div className="absolute top-0 w-screen h-screen bg-black z-20">
          <div className="flex justify-start md:hidden z-30">
            <button className="text-white p-4" onClick={() => setShowMenu(!showMenu)}>
              {!showMenu ? (
                <FontAwesomeIcon className="text-white" width={25} icon={faBars} />
              ) : (
                <FontAwesomeIcon className="text-white" width={25} icon={faX} />
              )}
            </button>
          </div>
          <ul className="flex  flex-col gap-5  items-center pt-28 text-white text-3xl">
            <li>
              <a href="#presentation" onClick={() => setShowMenu(false)}>
                Présentation
              </a>
            </li>
            <li>
              <a href="#postuler" onClick={() => setShowMenu(false)}>
                Postuler
              </a>
            </li>
            <li>
              <a href="#charte" onClick={() => setShowMenu(false)}>
                Charte de la guilde
              </a>
            </li>
            <li>
              <a href="#galerie" onClick={() => setShowMenu(false)}>
                Galerie
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setShowMenu(false)}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
      <div className="hidden md:flex gap-10 justify-center py-7">
        <a href="#presentation">Présentation</a>
        <a href="#postuler">Postuler</a>
        <a href="#charte">Charte de la guilde</a>
        <a href="#galerie">Galerie</a>
        <a href="#contact">Contact</a>
      </div>
      <Login />
    </header>
  );
}

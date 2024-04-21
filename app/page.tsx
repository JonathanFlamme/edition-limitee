'use client';
import Contact from './contact';
import Postuler from './postuler';
import CharteDeGuilde from './charte';
import Presentation from './presentation';
import Acceuil from './acceuil';
import Galerie from './galerie';
import Recherche from './recherche';
import Footer from './footer';

import Image from 'next/image';
import grunge_black from '@/public/grunge_black.webp';

export default function Home() {
  return (
    <main>
      <div className="">
        <Acceuil />
        <Image src={grunge_black} alt="grunge_black" />
        <Presentation />
        <Recherche />
        <Image
          src={grunge_black}
          alt="grunge_black"
          className="bg-black bg-opacity-50 transform rotate-180"
        />
        <Postuler />
        <Image src={grunge_black} alt="grunge_black" className="bg-black bg-opacity-50 " />
        <CharteDeGuilde />
        <Image
          src={grunge_black}
          alt="grunge_black"
          className="bg-black bg-opacity-50 transform rotate-180"
        />
        <Galerie />
        <Image src={grunge_black} alt="grunge_black" className="bg-black bg-opacity-50 " />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}

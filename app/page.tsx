'use client';
import Contact from './components/contact';
import Postuler from './components/postuler';
import CharteDeGuilde from './components/charte';
import Presentation from './components/presentation';
import Acceuil from './components/acceuil';
import Galerie from './components/galerie';
import Recherche from './components/recherche';
import Footer from './components/footer';

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

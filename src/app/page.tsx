import Contact from '@/src/components/landing/contact';
import Postuler from '@/src/components/landing/postuler';
import CharteDeGuilde from '@/src/components/landing/charte';
import Presentation from '@/src/components/landing/presentation/Presentation';
import Acceuil from '@/src/components/landing/acceuil';
import Galerie from '@/src/components/landing/galerie';
import Recherche from '@/src/components/landing/recherche';
import Footer from '@/src/components/landing/footer';

import Image from 'next/image';
import grunge_black from '@/public/grunge_black.webp';
import Header from './header';

export default function Home() {
  return (
    <main>
      <div>
        <Header />

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

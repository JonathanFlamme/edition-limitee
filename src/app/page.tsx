import Contact from '@/src/components/landing/contact/Contact';
import Postuler from '@/src/components/landing/postuler';
import CharteDeGuilde from '@/src/components/landing/charte';
import Presentation from '@/src/components/landing/presentation/Presentation';
import Acceuil from '@/src/components/landing/acceuil';
import Galerie from '@/src/components/landing/galerie';
import Search from '@/src/components/landing/search/Search';

import Image from 'next/image';
import grunge_black from '@/public/grunge_black.webp';

export default function Page() {
  return (
    <main>
      <div>
        <Acceuil />
        <Image src={grunge_black} alt="grunge_black" />
        <Presentation />
        <Search />
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
      </div>
    </main>
  );
}

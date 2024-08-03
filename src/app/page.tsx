import Contact from '@/src/components/home/contact/Contact';
import Postuler from '@/src/components/home/postuler';
import CharteDeGuilde from '@/src/components/home/charte';
import Presentation from '@/src/components/home/presentation/Presentation';
import Acceuil from '@/src/components/home/acceuil';
import Galerie from '@/src/components/home/galerie';
import Search from '@/src/components/home/search/Search';

import Image from 'next/image';
import grunge_black from '@/public/grunge_black.webp';
import { ContactType, SearchType } from '@/@type/type';

// async function fetchHome() {
//   const baseUrl = process.env.BASE_URL || `https://${process.env.VERCEL_URL}`;

//   const res = await fetch(`${baseUrl}/api/home`, {
//     cache: 'no-store',
//   });
//   if (!res.ok) {
//     return { contacts: [], searches: [] };
//     // throw new Error('Failed to fetch GET data');
//   }
//   return await res.json();
// }

// async function fetchHome() {
//   const baseUrl = process.env.BASE_URL || `https://${process.env.VERCEL_URL}`;

//   const res = await fetch(`${baseUrl}/api/home/presentations`, {
//     cache: 'no-store',
//   });
//   if (!res.ok) {
//     return [];
//     // throw new Error('Failed to fetch GET data');
//   }
//   return await res.json();
// }

export default async function Page() {
  // const { contacts, searches } = await fetchHome();
  const contacts: ContactType[] = [];
  const searches: SearchType[] = [];

  return (
    <main>
      <div>
        <Acceuil />
        <Image src={grunge_black} alt="grunge_black" />
        <Presentation />
        <Search searches={searches} />
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
        <Contact contacts={contacts} />
      </div>
    </main>
  );
}

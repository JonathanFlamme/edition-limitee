import Image from 'next/image';
import grunge_black from '@/public/grunge_black.webp';
import dynamic from 'next/dynamic';

const Acceuil = dynamic(() => import('@/src/components/home/acceuil'), { ssr: true });
const Presentation = dynamic(() => import('@/src/components/home/presentation/Presentation'), {
  loading: () => <p>Chargement en cours...</p>,
  ssr: false,
});
const Search = dynamic(() => import('@/src/components/home/search/Search'), {
  loading: () => <p>Chargement en cours...</p>,
  ssr: false,
});
const Postuler = dynamic(() => import('@/src/components/home/postuler'), {
  loading: () => <p>Chargement en cours...</p>,
  ssr: false,
});
const CharteDeGuilde = dynamic(() => import('@/src/components/home/charte'), {
  loading: () => <p>Chargement en cours...</p>,
  ssr: false,
});
const Galerie = dynamic(() => import('@/src/components/home/galerie'), {
  loading: () => <p>Chargement en cours...</p>,
  ssr: false,
});
const Contact = dynamic(() => import('@/src/components/home/contact/Contact'), {
  loading: () => <p>Chargement en cours...</p>,
  ssr: false,
});

export default async function Page() {
  return (
    <main>
      <div>
        <Acceuil />
        <Image src={grunge_black} alt="grunge_black" loading="lazy" />
        <Presentation />
        <Search />
        <Image
          src={grunge_black}
          alt="grunge_black"
          className="bg-black bg-opacity-50 transform rotate-180"
          loading="lazy"
        />
        <Postuler />
        <Image src={grunge_black} alt="grunge_black" className="bg-black bg-opacity-50 " />
        <CharteDeGuilde />
        <Image
          src={grunge_black}
          alt="grunge_black"
          className="bg-black bg-opacity-50 transform rotate-180"
          loading="lazy"
        />
        <Galerie />
        <Image
          src={grunge_black}
          alt="grunge_black"
          className="bg-black bg-opacity-50"
          loading="lazy"
        />
        <Contact />
      </div>
    </main>
  );
}

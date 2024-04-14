import Image from 'next/image';
import ContactPage from './contact';
import Postuler from './postuler';
import CharteDeGuilde from './charte';
import Presentation from './presentation';
import Acceuil from './acceuil';

export default function Home() {
  return (
    <main>
      <div className="">
        <Acceuil />
        <Presentation />
        <ContactPage />
        {/* <Postuler /> */}
        {/* <CharteDeGuilde /> */}
      </div>
    </main>
  );
}

'use client';
import Contact from './contact';
import Postuler from './postuler';
import CharteDeGuilde from './charte';
import Presentation from './presentation';
import Acceuil from './acceuil';
import Galerie from './galerie';
import Recherche from './recherche';
import Footer from './footer';

export default function Home() {
  return (
    <main>
      <div className="">
        <Acceuil />
        <Presentation />
        <Recherche />
        <Postuler />
        <CharteDeGuilde />
        <Galerie />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}

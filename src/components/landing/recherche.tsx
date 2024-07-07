import React from 'react';
import Image from 'next/image';
import dps from '@/public/dps.jpeg';
import heal from '@/public/heal.jpg';
import tank from '@/public/tank.png';
import { jost } from '@/src/utils/font';

const Recherche = () => {
  return (
    <div
      id="recherche"
      className={`${jost.className} flex flex-col items-center bg-black text-3xl text-white gap-7 py-28`}
    >
      <h1 className="text-5xl text-center md:text-7xl font-bold pb-10">Les profils recherchés</h1>
      <div className="flex flex-col md:flex-row justify-between md:gap-20">
        <div>
          <Image src={dps} width={200} alt="dps" className="pb-8 m-auto" />
          <h2 className="text-4xl font-bold pb-7">Distances :</h2>
          <ul>
            <li>- Evocateur</li>
            <li>- Chasseur</li>
            <li>- Druide</li>
            <li>- Chaman</li>
            <li>- Mage</li>
          </ul>
        </div>
        <div className="md:pt-16">
          <Image src={dps} width={200} alt="dps" className="pb-8 m-auto" />
          <h2 className="text-4xl font-bold pb-7">Corps à corp :</h2>
          <ul>
            <li>- DK (Givre ou Impie)</li>
            <li>- DH (Dévastation)</li>
            <li>- Paladin</li>
            <li>- Voleur</li>
          </ul>
        </div>
        <div className="pt-16 md:pt-32">
          <Image src={heal} width={200} alt="dps" className="pb-8 m-auto" />
          <h2 className="text-4xl font-bold pb-7">Healer :</h2>
          <ul>
            <li>- Evocateur</li>
            <li>- Chaman</li>
            <li>- Prêtre</li>
          </ul>
        </div>
        <div className="pt-16 md:pt-48">
          <Image src={tank} width={200} alt="dps" className="pb-8 m-auto" />
          <h2 className="text-4xl font-bold pb-7">Tank :</h2>
          <p>Pas de recrutement</p>
          <p>actuellement</p>
        </div>
      </div>
      <h3 className="text-xl font-bold py-10">* Toutes autres candidatures sera étudiées</h3>
    </div>
  );
};

export default Recherche;

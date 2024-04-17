import { jost, shadowsIntoLight } from '@/utils/font';
import React from 'react';

const Presentation = () => {
  return (
    <div
      id="presentation"
      className="flex flex-col items-center bg-black text-3xl text-white gap-7 py-28 bg-separation-page"
    >
      <h1 className={`${jost.className} text-7xl font-bold pb-12`}>Présentation</h1>
      <p>Nous souhaitons rester une guilde Conviviale et familiale.</p>
      <p>Nos objectifs sont de clean le HM et de voir le Mythique.</p>
      <p>
        L&apos;humour et la camaraderie sont d&apos;ordre ainsi que le sérieux et l&apos;application
        lors des trys.
      </p>
      <p>
        La vie IRL est prioritaire tout en vous rappelant qu&apos;un groupe entier compte sur vous
        les
      </p>
      <p>Nous vous demandons de vérifier vos disponibilités avant de postuler.</p>
      <p>Raid : Lundi + Mercredi de 21h00 à 23h30.</p>
      <p>(groupage à partir de 20h45)</p>
      <p>Nous favorisons l&apos;entraide entre joueurs.</p>
      <p>BTag de contact en bas du site.</p>
    </div>
  );
};

export default Presentation;

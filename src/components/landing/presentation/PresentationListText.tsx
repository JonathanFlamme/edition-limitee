'use client';

import { jost } from '@/src/utils/font';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { PresentationType } from '@/@type/type';
import { motion } from 'framer-motion';
import AddPresentation from './AddPresentation';

interface PresentationListTextProps {
  presentations: PresentationType[];
}

export default function PresentationListText({ presentations }: PresentationListTextProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [showEdit, setShowEdit] = useState(false);
  // const presentions: presentationType[] = [
  //   { text: 'Nous souhaitons rester une guilde Conviviale et familiale.' },
  //   { text: 'Nos objectifs sont de clean le HM et de voir le Mythique.' },
  //   {
  //     text: "L'humour et la camaraderie sont d'ordre ainsi que le sérieux et l'application lors des trys.",
  //   },
  //   {
  //     text: "La vie IRL est prioritaire tout en vous rappelant qu'un groupe entier compte sur vous.",
  //   },
  //   { text: 'Nous vous demandons de vérifier vos disponibilités avant de postuler.' },
  //   { text: 'Raid : Lundi + Mercredi de 21h00 à 23h30.' },
  //   { text: '(groupage à partir de 20h45)' },
  //   { text: "Nous favorisons l'entraide entre joueurs." },
  //   { text: 'BTag de contact en bas du site.' },
  // ];

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <>
      <button
        onClick={() => setShowEdit(!showEdit)}
        className={`${jost.className} text-white px-4 py-2 bg-blue-600 rounded`}
      >
        {showEdit ? 'Hide Edit' : 'Show Edit'}
      </button>
      {showEdit && <AddPresentation presentationsProps={presentations} />}
      <div className="flex flex-col items-left text-white gap-2 py-16 px-5 md:items-center md:text-3xl md:gap-7 md:py-28 bg-separation-page">
        <h1
          className={`${jost.className} text-5xl text-center md:text-7xl font-bold md:pb-12 pb-5`}
        >
          Présentation
        </h1>
        <div ref={ref}>
          {inView &&
            presentations.map((presention, index) => (
              <motion.p
                key={index}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={variants}
                transition={{ duration: 0.5, delay: index * 0.3 }}
                className="md:text-center text-white gap-2 py-2 md:py-3 px-5  md:text-4xl"
              >
                {presention.name}
              </motion.p>
            ))}
        </div>
      </div>
    </>
  );
}

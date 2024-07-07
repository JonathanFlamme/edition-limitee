import React from 'react';
import Image from 'next/image';
import dps from '@/public/dps.jpeg';
import heal from '@/public/heal.jpg';
import tank from '@/public/tank.png';
import { jost } from '@/src/utils/font';
import { motion } from 'framer-motion';
import { searchMembersType } from '@/@type/type';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from '@/src/hooks/use-media-query';
import LetterPullup from '@/src/components/magicui/letter-pullup';

const searchMembers: searchMembersType[] = [
  {
    image: dps,
    title: 'Distances :',
    classes: ['Evocateur', 'Chasseur', 'Druide', 'Chaman', 'Mage'],
  },
  {
    image: dps,
    title: 'Corps à corp :',
    classes: ['DK', 'DH', 'Paladin', 'Voleur'],
  },
  {
    image: heal,
    title: 'Healer :',
    classes: ['Evocateur', 'Chaman', 'Prêtre'],
  },
  {
    image: tank,
    title: 'Tank :',
    classes: ['Pas de recrutement', 'actuellement'],
  },
];
export default function Recherche() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      id="recherche"
      className={`${jost.className} flex flex-col items-center bg-black text-3xl text-white gap-7 py-28`}
    >
      <h1 className="text-5xl text-center md:text-7xl font-bold pb-10">Les profils recherchés</h1>
      <div className="flex flex-col md:flex-row justify-between md:gap-20">
        {searchMembers.map((searchMember, index) => (
          <ProfileBlock key={index} searchMember={searchMember} index={index} />
        ))}
      </div>
      <div ref={ref}>
        {inView && (
          <LetterPullup
            className="text-white text-center pt-10 text-base"
            words={'* Toutes autres candidatures sera étudiées'}
            delay={0.04}
          />
        )}
      </div>
    </div>
  );
}

function ProfileBlock({ searchMember, index }: { searchMember: searchMembersType; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const isMdUp = useMediaQuery('(min-width: 768px)');

  const marginTop = isMdUp ? index * 80 : 100;

  return (
    <motion.div
      ref={ref}
      className={`text-center`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 50, x: isMdUp ? 0 : 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      style={{ marginTop: `${marginTop}px` }}
    >
      <Image
        src={searchMember.image}
        width={200}
        alt={searchMember.title}
        className="pb-8 m-auto"
      />
      <h2 className="text-4xl font-bold pb-7">{searchMember.title}</h2>
      <ul>
        {searchMember.classes.map((classe, index) => (
          <li key={index}>- {classe}</li>
        ))}
      </ul>
    </motion.div>
  );
}

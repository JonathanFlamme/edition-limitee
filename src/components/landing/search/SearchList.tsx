'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import dps from '@/public/dps.jpeg';
import heal from '@/public/heal.jpg';
import tank from '@/public/tank.png';
import { jost } from '@/src/utils/font';
import { motion } from 'framer-motion';
import { SearchType } from '@/@type/type';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from '@/src/hooks/use-media-query';
import LetterPullup from '@/src/components/magicui/letter-pullup';
import { Pencil } from 'lucide-react';
import { Role } from '@/@type/role.enum';
import { useSession } from 'next-auth/react';
import { ConfirmDialogProvider } from '@omit/react-confirm-dialog';
import HandleSearch from './HandleSearch';

// const searchMembers: SearchMembersType[] = [
//   {
//     image: dps,
//     name: 'Distances :',
//     classes: ['Evocateur', 'Chasseur', 'Druide', 'Chaman', 'Mage'],
//   },
//   {
//     image: dps,
//     name: 'Corps à corp :',
//     classes: ['DK', 'DH', 'Paladin', 'Voleur'],
//   },
//   {
//     image: heal,
//     name: 'Healer :',
//     classes: ['Evocateur', 'Chaman', 'Prêtre'],
//   },
//   {
//     image: tank,
//     name: 'Tank :',
//     classes: ['Pas de recrutement', 'actuellement'],
//   },
// ];

interface SearchListProps {
  searches: SearchType[];
}

export default function SearchList({ searches }: SearchListProps) {
  const { data: session } = useSession();
  const [showEdit, setShowEdit] = useState(false);
  const [items, setItems] = useState<SearchType[]>(searches);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <div className="flex justify-end pr-5 pt-28">
        {session?.character?.role === Role.Officier && (
          <button
            onClick={() => setShowEdit(!showEdit)}
            className={`${jost.className} text-white px-3 py-2 border-white border-2 rounded-full`}
          >
            <Pencil size={20} />
          </button>
        )}
      </div>
      <div
        id="recherche"
        className={`${jost.className} flex flex-col items-center bg-black text-white gap-7 pb-28 `}
      >
        {showEdit ? (
          <ConfirmDialogProvider defaultOptions={{}}>
            <HandleSearch items={items} setItems={setItems} setShowEdit={setShowEdit} />
          </ConfirmDialogProvider>
        ) : (
          <>
            <h1 className="text-5xl text-center font-bold pb-10">Les profils recherchés</h1>
            <div className="flex flex-col md:flex-row text-3xl justify-between md:gap-10">
              {items.map((item, index) => (
                <ProfileBlock key={index} item={item} index={index} />
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
          </>
        )}
      </div>
    </>
  );
}

function ProfileBlock({ item, index }: { item: SearchType; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const isMdUp = useMediaQuery('(min-width: 768px)');

  const marginTop = isMdUp ? index * 80 : 100;

  return (
    <motion.div
      ref={ref}
      className={`text-center md:max-w-64`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 50, x: isMdUp ? 0 : 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      style={{ marginTop: `${marginTop}px` }}
    >
      <Image
        src={item.image}
        width={200}
        height={200}
        priority={index === 0}
        alt={item.name}
        className="pb-8 m-auto w-44"
      />
      <h2 className="text-3xl font-bold pb-7">{item.name}</h2>
      <ul>
        {item.classes.map((classe, index) => (
          <>
            <li className="capitalize text-xl font-light" key={index}>
              {classe}
            </li>
            {index < item.classes.length - 1 && <li>-</li>}
          </>
        ))}
      </ul>
    </motion.div>
  );
}

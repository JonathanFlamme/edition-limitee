'use client';

import { jost } from '@/src/utils/font';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ContactType } from '@/@type/type';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@/src/hooks/use-media-query';
import { useSession } from 'next-auth/react';
import { Pencil } from 'lucide-react';
import { Role } from '@/@type/role.enum';
import HandleContact from './HandleContact';
import { ConfirmDialogProvider } from '@omit/react-confirm-dialog';

interface ContactProps {
  contacts: ContactType[];
}

export default function ContactList({ contacts }: ContactProps) {
  const { data: session } = useSession();
  const [showEdit, setShowEdit] = useState(false);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const isMdUp = useMediaQuery('(min-width: 768px)');
  const [items, setItems] = useState<ContactType[]>(contacts);

  const variants = {
    hiddenLeft: { opacity: 0, x: isMdUp ? -100 : -50 },
    hiddenRight: { opacity: 0, x: isMdUp ? 100 : 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <div className="flex justify-end pr-5 pt-10">
        {session?.character?.role === Role.Officier && (
          <button
            onClick={() => setShowEdit(!showEdit)}
            className={`${jost.className} text-white px-3 py-2 border-white border-2 rounded-full`}
          >
            <Pencil size={20} />
          </button>
        )}
      </div>
      <div className="flex flex-col items-center bg-black text-white gap-2 pb-20">
        {showEdit ? (
          <ConfirmDialogProvider defaultOptions={{}}>
            <HandleContact items={items} setItems={setItems} setShowEdit={setShowEdit} />
          </ConfirmDialogProvider>
        ) : (
          <>
            <h1 className={`${jost.className} text-3xl font-bold mb-4`}>Nous joindre :</h1>
            <div ref={ref} className="text-xl">
              {inView &&
                items?.map((contact, index) => (
                  <motion.p
                    key={index}
                    initial={index % 2 === 0 ? 'hiddenLeft' : 'hiddenRight'}
                    animate={inView ? 'visible' : index % 2 === 0 ? 'hiddenLeft' : 'hiddenRight'}
                    variants={variants}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    {contact.name} : {contact.bnet}
                  </motion.p>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

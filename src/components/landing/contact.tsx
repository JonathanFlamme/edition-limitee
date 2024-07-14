'use client';

import { jost } from '@/src/utils/font';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ContactType } from '@/@type/type';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@/src/hooks/use-media-query';
import { fetchContact } from '@/src/utils/landing';

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const isMdUp = useMediaQuery('(min-width: 768px)');
  // const [contacts, setFetchContacts] = useState<ContactType[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const contact: ContactType[] = await fetchContact();
  //     setFetchContacts(contact);
  //   };

  //   fetchData();
  // }, []);
  const contacts: ContactType[] = [
    { name: 'Tweetÿ', bnet: 'tweety#2358' },
    { name: 'Joflamme', bnet: 'Joflamme#2580' },
    { name: 'Isthrale', bnet: 'LalKédu02#2766' },
    { name: 'Ophite', bnet: 'nethermoon#2683' },
  ];
  const variants = {
    hiddenLeft: { opacity: 0, x: isMdUp ? -100 : -50 },
    hiddenRight: { opacity: 0, x: isMdUp ? 100 : 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div id="contact" className="flex flex-col items-center bg-black text-white gap-2 py-20">
      <h1 className={`${jost.className} text-4xl font-bold mb-4`}>Nous joindre :</h1>
      <div ref={ref} className="text-2xl">
        {contacts?.map((contact, index) => (
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
    </div>
  );
}

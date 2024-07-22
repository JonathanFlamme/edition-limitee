'use client';

import { jost } from '@/src/utils/font';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { PresentationType } from '@/@type/type';
import { motion } from 'framer-motion';
import AddPresentation from './AddPresentation';
import { ConfirmDialogProvider } from '@omit/react-confirm-dialog';
import { Pencil } from 'lucide-react';
import { Role } from '@/@type/role.enum';
import { useSession } from 'next-auth/react';

interface PresentationListTextProps {
  presentationsProps: PresentationType[];
}

export default function PresentationListText({ presentationsProps }: PresentationListTextProps) {
  const { data: session } = useSession();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [showEdit, setShowEdit] = useState(false);
  const [presentations, setPresentations] = useState<PresentationType[]>(presentationsProps);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <>
      <div className="flex justify-end pr-5 pt-28 mb-10">
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
            <AddPresentation
              presentationsProps={presentations}
              setPresentations={setPresentations}
              setShowEdit={setShowEdit}
            />
          </ConfirmDialogProvider>
        ) : (
          <>
            <h1 className={`${jost.className} text-5xl text-center font-bold md:pb-12 pb-5`}>
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
                    className="md:text-center text-white gap-2 py-2 md:py-3 px-5 md:text-2xl md:w-[750px]"
                  >
                    {presention.name}
                  </motion.p>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

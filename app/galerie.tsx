import React from 'react';
import Image from 'next/image';
import image1 from '../public/galerie/image1.jpg';
import { jost } from '@/utils/font';

const Galerie = () => {
  return (
    <div id="galerie" className="bg-black bg-opacity-50 py-16">
      <h1 className={`${jost.className} text-7xl text-center text-white font-bold pb-16`}>
        Galerie
      </h1>
      <div className="flex justify-center">
        <Image src={image1} alt="raid" width={500} height={500} />
      </div>
    </div>
  );
};

export default Galerie;

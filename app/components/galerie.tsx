import React from 'react';
import Image from 'next/image';
import image1 from '../../public/galerie/image1.jpg';
import image2 from '../../public/galerie/image2.png';
import image3 from '../../public/galerie/image3.png';
import image4 from '../../public/galerie/image4.jpg';
import { jost } from '@/utils/font';

const Galerie = () => {
  return (
    <div id="galerie" className="bg-black bg-opacity-50 py-16">
      <h1 className={`${jost.className} text-7xl text-center text-white font-bold pb-16`}>
        Galerie
      </h1>
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-0">
        <div className="flex flex-col gap-5  md:mr-4">
          <Image src={image1} alt="raid" width={500} height={500} />
          <Image src={image2} alt="raid" width={500} height={500} />
        </div>
        <div className="flex flex-col gap-5 md:ml-4">
          <Image src={image3} alt="raid" width={500} height={500} />
          <Image src={image4} alt="raid" width={500} height={500} />
        </div>
      </div>
    </div>
  );
};

export default Galerie;

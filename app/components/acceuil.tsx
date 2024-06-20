import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faW } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { shadowsIntoLight } from '@/utils/font';
import raiderIo from '../../public/logo_raiderIO_blanc.png';

const Acceuil = () => {
  const handleScrollToPostuler = () => {
    const postuler = document.getElementById('postuler');
    postuler?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="acceuil" className="relative h-screen flex justify-center">
      <div className="absolute flex flex-col items-center left-1/2 top-3/4 transform -translate-x-1/2">
        <button
          onClick={handleScrollToPostuler}
          className={`${shadowsIntoLight.className} border-2 border-white text-white text-base py-2 md:text-2xl py-2 md:py-2 px-6 md:px-14 px-14 transition duration-500 hover:bg-white hover:text-black`}
        >
          Postuler
        </button>
        <div className="text-white text-center text-base mb:text-xl">
          <h2>Pour nous suivre: </h2>
        </div>
        <div className="text-white text-center flex flex-row gap-7 pt-2">
          <a href="https://www.facebook.com/groups/281196140039473" target="_blank">
            <FontAwesomeIcon className="text-white" width={25} icon={faFacebookF} />
          </a>
          <a href="https://discord.com/invite/Ue4wbVa" target="_blank">
            <FontAwesomeIcon className="text-white" width={25} icon={faDiscord} />
          </a>
          <a href="https://raider.io/guilds/eu/elune/%C3%89dition%20Limit%C3%A9e" target="_blank">
            <Image src={raiderIo} className="text-white" width={25} alt="Logo raiderIo" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Acceuil;

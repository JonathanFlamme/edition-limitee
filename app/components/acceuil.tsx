import React from 'react';
import DiscordIcon from '@/assets/icons/discord.svg';
import FacebookIcon from '@/assets/icons/facebook.svg';
import Image from 'next/image';
import { shadowsIntoLight } from '@/utils/font';
import raiderIo from '../../public/logo_raiderIO_blanc.png';
import { useSession } from 'next-auth/react';
import { Button } from './ui/button';

const Acceuil = () => {
  const { data: session } = useSession();

  const handleScrollToPostuler = () => {
    const postuler = document.getElementById('postuler');
    postuler?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="acceuil" className=" text-white relative h-screen flex justify-center">
      <div className="absolute flex flex-col items-center left-1/2 top-3/4 transform -translate-x-1/2">
        <Button
          variant="outline"
          onClick={handleScrollToPostuler}
          className={`${shadowsIntoLight.className} text-3xl py-7 border-2 mb-4 bg-transparent`}
          size="lg"
        >
          Postuler
        </Button>
        <div className="text-white text-center text-base mb:text-xl">
          <h2>Pour nous suivre: </h2>
        </div>
        <div className="text-white text-center flex flex-row gap-7 pt-2">
          <a href="https://www.facebook.com/groups/281196140039473" target="_blank">
            <FacebookIcon className="text-white" width={40} />
          </a>
          <a href="https://discord.com/invite/Ue4wbVa" target="_blank">
            <DiscordIcon className="text-white" width={40} />
          </a>
          <a href="https://raider.io/guilds/eu/elune/%C3%89dition%20Limit%C3%A9e" target="_blank">
            <Image src={raiderIo} className="text-white" width={38} alt="Logo raiderIo" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Acceuil;

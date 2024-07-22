'use client';
import React from 'react';
import DiscordIcon from '@/assets/icons/discord.svg';
import FacebookIcon from '@/assets/icons/facebook.svg';
import RaiderIo from '@/assets/icons/raiderIo.svg';
import { shadowsIntoLight } from '@/src/utils/font';
import { Button } from '@/src/components/ui/button';
import { motion } from 'framer-motion';

export default function Acceuil() {
  const handleScrollToPostuler = () => {
    const postuler = document.getElementById('postuler');
    postuler?.scrollIntoView({ behavior: 'smooth' });
  };

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div id="acceuil" className="text-white relative h-screen flex justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
        className="absolute flex flex-col items-center top-3/4 transform -translate-x-1/2 rounded-3xl"
      >
        <Button
          variant="outline"
          onClick={handleScrollToPostuler}
          className={`${shadowsIntoLight.className} text-3xl py-7 border-2 mb-4 bg-transparent`}
          size="lg"
        >
          Postuler
        </Button>
        <p className="text-white text-xl text-stroke md:text-3xl">Suivez notre actualité:</p>
        <div className="text-white text-center flex flex-row gap-7 pt-1">
          <a href="https://www.facebook.com/groups/281196140039473" target="_blank">
            <FacebookIcon
              className="text-white stroke-black hover:scale-125 duration-300"
              width={40}
            />
          </a>
          <a href="https://discord.com/invite/Ue4wbVa" target="_blank">
            <DiscordIcon
              className="text-white stroke-black hover:scale-125 duration-300"
              width={40}
            />
          </a>
          <a href="https://raider.io/guilds/eu/elune/%C3%89dition%20Limit%C3%A9e" target="_blank">
            <RaiderIo className="text-white hover:scale-125 duration-300 mt-1" width={35} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

import { jost } from '@/utils/font';
import React from 'react';

const Contact = () => {
  return (
    <div id="contact" className="flex flex-col items-center bg-black text-white gap-2 py-20">
      <h1 className={`${jost.className} text-4xl font-bold mb-4`}>Nous joindre</h1>
      <div className="text-2xl">
        <p>Tweetÿ : tweety#2358</p>
        <p>Joflamme: Joflamme#2580</p>
        <p>Isthrale : LalKédu02#2766</p>
      </div>
    </div>
  );
};

export default Contact;

import React from 'react';
import PresentationListText from './PresentationListText';
import { PresentationType } from '@/@type/type';

// async function getData() {
//   const baseUrl = process.env.BASE_URL || `https://${process.env.VERCEL_URL}`;

//   const res = await fetch(`${baseUrl}/api/home/presentations`, {
//     cache: 'no-store',
//   });
//   if (!res.ok) {
//     return [];
//     // throw new Error('Failed to fetch GET data');
//   }
//   return await res.json();
// }

interface PresentationProps {
  presentations: PresentationType[];
}

export default async function Presentation({ presentations }: PresentationProps) {
  // const data = await getData();
  return (
    <div id="presentation" className="bg-black">
      <PresentationListText presentationsProps={presentations} />
    </div>
  );
}

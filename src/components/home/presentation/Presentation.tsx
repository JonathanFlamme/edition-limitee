import React from 'react';
import PresentationListText from './PresentationListText';
import { PresentationType } from '@/@type/type';

interface PresentationProps {
  presentations: PresentationType[];
}

export default async function Presentation({ presentations }: PresentationProps) {
  return (
    <div id="presentation" className="bg-black">
      <PresentationListText presentationsProps={presentations} />
    </div>
  );
}

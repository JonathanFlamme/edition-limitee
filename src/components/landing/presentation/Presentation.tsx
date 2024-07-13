import React from 'react';
import PresentationListText from './PresentationListText';

async function getData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/landing/presentations`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch GET data');
  }
  return res.json();
}

export default async function Presentation() {
  const data = await getData();
  return (
    <div id="presentation" className="bg-black">
      <PresentationListText presentations={data.presentations} />
    </div>
  );
}

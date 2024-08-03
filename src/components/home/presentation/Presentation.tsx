import React from 'react';
import PresentationListText from './PresentationListText';

async function getData() {
  const baseUrl = process.env.BASE_URL || `https://${process.env.VERCEL_URL}`;

  // const baseUrl =
  //   'https://edition-limitee-git-refacto-pr-5c1f0b-edition-limitees-projects.vercel.app';

  const res = await fetch(`${baseUrl}/api/home/presentations`, {
    next: { tags: ['presentations'], revalidate: 60 },
  });
  console.log('res', res);

  if (!res.ok) {
    return [];
    // throw new Error('Failed to fetch GET data');
  }
  return await res.json();
}

export default async function Presentation() {
  const data = await getData();
  console.log('data', data);
  return (
    <div id="presentation" className="bg-black">
      <PresentationListText presentationsProps={data.presentations} />
    </div>
  );
}

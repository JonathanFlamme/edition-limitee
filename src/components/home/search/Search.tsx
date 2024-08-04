import React from 'react';
import SearchList from './SearchList';

async function getData() {
  const baseUrl = process.env.BASE_URL || `https://${process.env.VERCEL_URL}`;

  const res = await fetch(`${baseUrl}/api/home/searches`, {
    method: 'GET',
    next: { revalidate: 3600, tags: ['searches'] },
  });
  if (!res.ok) {
    return [];
    // throw new Error('Failed to fetch GET data');
  }
  return await res.json();
}

export default async function Search() {
  const searches = await getData();

  return (
    <div id="recherche" className="bg-black">
      <SearchList searches={searches} />
    </div>
  );
}

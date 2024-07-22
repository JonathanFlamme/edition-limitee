import React from 'react';
import { SearchType } from '@/@type/type';
import SearchList from './SearchList';

// async function fetchSearch(): Promise<SearchType[]> {
//   const baseUrl = process.env.BASE_URL || `https://${process.env.VERCEL_URL}`;
//   const res = await fetch(`${baseUrl}/api/home/searches`, { cache: 'no-store' });

//   if (!res.ok) {
//     return [];
//     // throw new Error('Failed to fetch GET data');
//   }
//   return await res.json();
// }

interface SearchProps {
  searches: SearchType[];
}

export default async function Search({ searches }: SearchProps) {
  // const searches = await fetchSearch();

  return (
    <div id="recherche" className="bg-black">
      <SearchList searches={searches} />
    </div>
  );
}

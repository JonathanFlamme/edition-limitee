import React from 'react';
import { SearchType } from '@/@type/type';
import SearchList from './SearchList';

interface SearchProps {
  searches: SearchType[];
}

export default async function Search({ searches }: SearchProps) {
  return (
    <div id="recherche" className="bg-black">
      <SearchList searches={searches} />
    </div>
  );
}

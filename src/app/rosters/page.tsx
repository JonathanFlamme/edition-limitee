'use client';
import { jost } from '@/src/utils/font';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from './data.table';
import { columns } from './columns';
import { LoaderIcon } from 'lucide-react';
import { MemberType } from '@/@type/type';

export default function Roster() {
  async function getRoster() {
    const promise = fetch('/api/rosters', {
      method: 'GET',
    });

    const res = await promise;
    if (!res.ok) {
      throw new Error('Failed to fetch GET data');
    }

    const roster: MemberType[] = await res.json();
    return roster;
  }

  const { data, isPending, error } = useQuery({ queryKey: ['rosters'], queryFn: getRoster });

  if (error) return <div>Error loading rosters: {error.message}</div>;

  return (
    <div className={`${jost.className} page-container flex flex-col`}>
      {isPending ? (
        <div className="m-auto flex flex-col justify-center items-center text-stroke text-white text-2xl">
          <LoaderIcon color="white" className="animate-spin w-32 h-32" />
          <p>Chargement en cours...</p>
        </div>
      ) : (
        <DataTable columns={columns} dataProp={data} />
      )}
    </div>
  );
}

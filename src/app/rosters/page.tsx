'use client';
import { jost } from '@/src/utils/font';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from './data.table';
import { columns } from './columns';

export default function Roster() {
  async function getRoster() {
    const promise = fetch('/api/rosters', {
      method: 'GET',
    });

    const res = await promise;
    if (!res.ok) {
      throw new Error('Failed to fetch GET data');
    }

    const roster = await res.json();
    return roster;
  }

  const { data, isPending, error } = useQuery({ queryKey: ['rosters'], queryFn: getRoster });
  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error loading rosters: {error.message}</div>;

  return (
    <div className={`${jost.className} page-container`}>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

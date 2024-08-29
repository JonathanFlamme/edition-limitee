'use client';
import { DataTable } from './data.table';
import { columns } from './columns';
import { useMemberStore } from '@/src/store/memberStore';
import { useState } from 'react';

export default function MembersList() {
  const [isRosterEnabled, setIsRosterEnabled] = useState(false);
  const members = useMemberStore((state) => (isRosterEnabled ? state.roster : state.members));

  console.log(isRosterEnabled);
  return (
    <DataTable
      columns={columns}
      data={members}
      isRoseterEnabled={isRosterEnabled}
      setIsRosterEnabled={setIsRosterEnabled}
    />
  );
}

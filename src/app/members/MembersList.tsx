'use client';
import { DataTable } from './data.table';
import { columns } from './columns';
import { useMemberStore } from '@/src/store/memberStore';
import { useEffect, useState } from 'react';
import { MemberType } from '@/@type/type';

export default function MembersList() {
  const [isRosterEnabled, setIsRosterEnabled] = useState<boolean>(false);
  const [members, setMembers] = useState<MemberType[]>([]);
  const filterMembers = useMemberStore((state) =>
    isRosterEnabled ? state.roster : state.filterMembers,
  );

  useEffect(() => {
    setMembers(filterMembers);
  }, [setMembers, filterMembers]);

  console.log(filterMembers);
  return (
    <DataTable
      columns={columns}
      data={members}
      isRoseterEnabled={isRosterEnabled}
      setIsRosterEnabled={setIsRosterEnabled}
    />
  );
}

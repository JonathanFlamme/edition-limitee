'use client';
import { DataTable } from './data.table';
import { columns } from './columns';
import { useMemberStore } from '@/src/store/memberStore';

export default function MembersList() {
  const members = useMemberStore((state) => state.members);

  return <DataTable columns={columns} data={members} />;
}

'use client';
import { jost } from '@/src/utils/font';
import { LoaderIcon } from 'lucide-react';
import { useGuild } from '@/src/hooks/useGuild';
import MembersList from './MembersList';
import { useEffect } from 'react';
import { useGuildStore, useMemberStore, useMythicStore } from '@/src/store';
import { ConfirmDialogProvider } from '@omit/react-confirm-dialog';

export default function Members() {
  const setGuild = useGuildStore((state) => state.setGuild);
  const setMember = useMemberStore((state) => state.setMembers);
  const setMythic = useMythicStore((state) => state.setWeek);
  const setCurrentPeriod = useMythicStore((state) => state.setCurrentPeriod);
  const isInitialized = useGuildStore((state) => state.isInitialized);
  const setInitialized = useGuildStore((state) => state.setInitialized);
  const { data, isLoading, error } = useGuild();

  useEffect(() => {
    if (data && !isInitialized) {
      setGuild(data.guild);
      setMember(data.members);
      setMythic(data.week);
      setCurrentPeriod(data.week.period);

      setInitialized(true);
    }
  }, [data, isInitialized, setGuild, setMember, setMythic, setInitialized]);

  if (error) return <div>Error loading members: {error.message}</div>;

  return (
    <div className={`${jost.className} page-container flex flex-col`}>
      {isLoading ? (
        <div className="m-auto flex flex-col justify-center items-center text-stroke text-white text-2xl">
          <LoaderIcon color="white" className="animate-spin w-32 h-32" />
          <p>Chargement en cours...</p>
        </div>
      ) : (
        <ConfirmDialogProvider defaultOptions={{}}>
          <MembersList />
        </ConfirmDialogProvider>
      )}
    </div>
  );
}

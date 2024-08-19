import { fetchGuild } from '../lib/fetchGuild';
import { GuildType, MemberType } from '@/@type/type';
import { useQuery } from '@tanstack/react-query';

interface GuildResponse {
  guild: GuildType;
  members: MemberType[];
  startWeek: string;
  endWeek: string;
}

export function useGuild() {
  const { data, isLoading, error } = useQuery<GuildResponse>({
    queryKey: ['guild'],
    queryFn: fetchGuild,
    staleTime: Infinity,
  });

  return { data, isLoading, error };
}

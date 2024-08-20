import { fetchGuild } from '../lib/fetchGuild';
import { GuildResponse } from '@/@type/type';
import { useQuery } from '@tanstack/react-query';

export function useGuild() {
  const { data, isLoading, error } = useQuery<GuildResponse>({
    queryKey: ['guild'],
    queryFn: fetchGuild,
    staleTime: Infinity,
  });

  return { data, isLoading, error };
}

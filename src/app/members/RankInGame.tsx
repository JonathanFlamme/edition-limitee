import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';

import { jost } from '@/src/utils/font';
import { useSession } from 'next-auth/react';
import { Role } from '@/@type/role.enum';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useMemberStore } from '@/src/store';
import { RankMap } from '@/@type/member.map';

const items: { value: number; label: string }[] = [
  { value: 0, label: "0-Grand livre d'Or" },
  { value: 2, label: "2-Petit livre d'Or" },
  { value: 3, label: "3-Petit livre d'Or" },
  { value: 4, label: "4-Reliure d'Or" },
  { value: 5, label: '5-Edition Collector' },
  { value: 6, label: '6-Livre de poche' },
  { value: 7, label: '7-PU' },
  { value: 8, label: '8-Rerool' },
  { value: 9, label: '9-Polar' },
];

export default function RankInGame({ value, memberId }: { value: number; memberId: string }) {
  const { data: session } = useSession();
  const setUpdateMember = useMemberStore((state) => state.setupdateMember);

  const mutation = useMutation({
    mutationFn: async (rank: number) => {
      console.log(rank);
      const promise = fetch(`/api/members/${memberId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rank }),
      });

      toast.promise(promise, {
        loading: 'Mise à jour du rang en cours, veuillez patienter',
      });
      const response = await promise;
      if (!response.ok) {
        throw new Error('Failed to update member rank');
      }
      return response.json();
    },

    onSuccess: (updatedMember) => {
      setUpdateMember(memberId, { role: updatedMember.role });
      toast.success('Le rang a bien été changé');
    },
    onError: () => {
      toast.error('Une erreur est survenue lors du changement du rang');
    },
  });

  async function handleRoleChange(rank: number) {
    mutation.mutate(rank);
  }

  return (
    <>
      {session?.character.role === Role.Officier ? (
        <Select onValueChange={(rank: string) => handleRoleChange(Number(rank))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={RankMap[value]} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem
                  className={`${jost.className}`}
                  key={item.value}
                  value={item.value.toString()}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <div className="text-lg text-black">{RankMap[value]}</div>
      )}
    </>
  );
}

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
import { Role, RoleEnum, roleMap } from '@/@type/role.enum';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useMemberStore } from '@/src/store';

const items: { value: RoleEnum; label: string }[] = [
  { value: RoleEnum.Tank, label: 'Tank' },
  { value: RoleEnum.Heal, label: 'Heal' },
  { value: RoleEnum.Dps, label: 'Distant' },
  { value: RoleEnum.Cac, label: 'Corp à Corp' },
  { value: RoleEnum.Casu, label: 'Casu' },
  { value: RoleEnum.Pu, label: 'PU' },
];

export default function RoleInGame({ value, memberId }: { value: RoleEnum; memberId: string }) {
  const { data: session } = useSession();
  const setUpdateMember = useMemberStore((state) => state.setupdateMember);

  const mutation = useMutation({
    mutationFn: async (role: RoleEnum) => {
      const promise = fetch(`/api/members/${memberId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      });

      toast.promise(promise, {
        loading: 'Mise à jour du rôle en cours, veuillez patienter',
      });
      const response = await promise;
      if (!response.ok) {
        throw new Error('Failed to update member role');
      }
      return response.json();
    },

    onSuccess: (updatedMember) => {
      setUpdateMember(memberId, { role: updatedMember.role });
      toast.success('Le rôle a bien été changé');
    },
    onError: () => {
      toast.error('Une erreur est survenue lors du changement de rôle');
    },
  });

  async function handleRoleChange(role: RoleEnum) {
    mutation.mutate(role);
  }

  return (
    <>
      {session?.character.role === Role.Officier ? (
        <Select onValueChange={handleRoleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={roleMap[value]} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem className={`${jost.className}`} key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <div className="text-lg text-black">{roleMap[value]}</div>
      )}
    </>
  );
}

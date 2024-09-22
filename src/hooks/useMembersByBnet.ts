import { useMutation } from '@tanstack/react-query';

import { toast } from 'sonner';
import { useMemberStore } from '@/src/store/memberStore';
import { addMember, updateMembersByBnet } from '../lib/fetchMember';
import { updateMembersByBdd } from '../lib/fetchMember';
import { MemberType } from '@/@type/type';

export function useMembersByBnet() {
  const setMember = useMemberStore((state) => state.setMembers);

  const mutation = useMutation({
    mutationFn: updateMembersByBnet,
    onMutate: () => {
      toast('Mise à jour en cours, veuillez patienter');
    },
    onSuccess: (data) => {
      setMember(data);
      toast.success('Les membres ont été modifiés avec succès');
    },

    onError: (error) => {
      toast.error(`${error.message}, Une erreur est survenue lors de la mise à jour`);
    },
  });
  return { updateMembersByBnet: mutation.mutate };
}

export function useMembersByBdd() {
  const setMember = useMemberStore((state) => state.setMembers);

  const mutation = useMutation({
    mutationFn: updateMembersByBdd,
    onMutate: () => {
      toast('Mise à jour en cours, veuillez patienter');
    },
    onSuccess: (data) => {
      setMember(data);
      toast.success('Les membres ont été modifiés avec succès');
    },

    onError: (error) => {
      toast.error(`${error.message}, Une erreur est survenue lors de la mise à jour`);
    },
  });
  return { updateMembersByBdd: mutation.mutate };
}

export function useAddMember() {
  const members = useMemberStore((state) => state.members);
  const setMember = useMemberStore((state) => state.setMembers);

  const mutation = useMutation({
    mutationFn: (newMember: Partial<MemberType>) => addMember(newMember),
    onMutate: () => {
      toast('Ajout en cours, veuillez patienter');
    },
    onSuccess: (data) => {
      setMember([...members, data]);
      toast.success('Le member à été ajouté avec succès');
    },

    onError: (error) => {
      toast.error(`${error.message}, Une erreur est survenue lors de l'ajout du membre`);
    },
  });
  return { addMember: mutation.mutate };
}

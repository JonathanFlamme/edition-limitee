import { useMutation } from '@tanstack/react-query';

import { toast } from 'sonner';
import { useMemberStore } from '@/src/store/memberStore';
import { updateMembersByBnet } from '../lib/fetchMember';

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

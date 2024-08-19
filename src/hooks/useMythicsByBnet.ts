import { useMutation } from '@tanstack/react-query';

import { toast } from 'sonner';
import { useMemberStore } from '@/src/store/memberStore';
import { updateMythicsByBnet } from '../lib/fetchMythic';

export function useMythicsByBnet() {
  const setMember = useMemberStore((state) => state.setMembers);

  const mutation = useMutation({
    mutationFn: updateMythicsByBnet,
    onMutate: () => {
      toast('Mise à jour en cours, veuillez patienter');
    },
    onSuccess: (data) => {
      setMember(data);
      toast.success('Les mythics ont été modifiés avec succès');
    },

    onError: (error) => {
      toast.error(`${error.message}, Une erreur est survenue lors de la mise à jour`);
    },
  });
  return { updateMythicsByBnet: mutation.mutate };
}

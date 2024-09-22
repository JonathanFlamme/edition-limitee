import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { jost } from '@/src/utils/font';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { MemberType } from '@/@type/type';
import { Input } from '@/src/components/ui/input';
import { Avatar, AvatarImage } from '@/src/components/ui/avatar';
import { useState } from 'react';
import { useConfirm } from '@omit/react-confirm-dialog';
import { useAddMember } from '@/src/hooks/useMembersByBnet';

export default function SearchCharactere() {
  const [character, setCharacter] = useState<Partial<MemberType>>({});
  const confirm = useConfirm();
  const [open, SetOpen] = useState(false);
  const { addMember } = useAddMember();

  const formSchema = z.object({
    name: z.string().max(50, { message: 'La description doit contenir moins de 50 caractères' }),
    realm: z.string().max(50, { message: 'La description doit contenir moins de 50 caractères' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      realm: '',
    },
  });

  // ---------- SEARCH MEMBER ---------- //
  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutationSearch.mutate(values);
  }

  const mutationSearch = useMutation({
    mutationFn: async (values: Partial<MemberType>) => {
      const promise = fetch(`/api/members/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      toast.promise(promise, {
        loading: 'Recherche du personnage en cours, veuillez patienter',
      });
      const response = await promise;
      if (!response.ok) {
        throw new Error('Failed to update guild');
      }
      return response.json();
    },

    onSuccess: (newMember) => {
      toast.success('Personnage trouvé');
      setCharacter(newMember);
    },
    onError: () => {
      toast.error('Une erreur est survenue lors de la mise à jour');
    },
  });

  // ---------- ADD MEMBER ---------- //
  async function handleCharacter() {
    const result = await confirm({
      title: 'Voulez-vous ajouter ce personnage à la liste des membres ?',
    });
    if (result) {
      addMember(character);
      SetOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={SetOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="custom-container p-3">
          <UserPlus className="w-5 h-5 transform transition duration-300 ease-in-out hover:scale-125" />
        </Button>
      </DialogTrigger>
      <DialogContent className={`${jost.className}`}>
        <DialogHeader>
          <DialogTitle>Rechercher un joueur</DialogTitle>
          <DialogDescription>
            Veuillez entrer le nom du personnage et le serveur associé.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white rounded-3xl border border-black py-5 px-6 space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du joueur</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="realm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serveur du joueur</FormLabel>
                  <FormControl>
                    <Input placeholder="Serveur" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Rechercher</Button>
          </form>
        </Form>
        <div
          onClick={() => handleCharacter()}
          className={`cursor-pointer flex mt-3 mr-1 md:mr-0 md:mt-4`}
        >
          <Avatar className={'w-16 h-16 rounded-xl'}>
            <AvatarImage src={character?.avatar || ''} alt="image profil bnet" />
          </Avatar>
          <div className="ml-2">
            <p className={`text-xl mt-1 block`}>
              {character?.name} - {''}
              <span className={`text-gray-700 capitalize text-base`}>{character?.realm}</span>
            </p>
            <p className={`text-base mt-1 block`}>{character?.class} </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

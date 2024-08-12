import React, { useEffect, useState } from 'react';
import { listCharacter } from '@/@type/type';
import { fetchCharacter, fetchCharacters } from '@/src/utils/characters';

import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { LoaderIcon, Users } from 'lucide-react';
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/src/components/ui/dropdown-menu';

export default function CharactersByRealm() {
  const { update } = useSession();
  const [listCharacters, setListCharacters] = useState<listCharacter[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const listCharacters = async () => {
      setLoading(true);
      const list: listCharacter[] = await fetchCharacters();
      setListCharacters(list);

      list && setLoading(false);
    };

    listCharacters();
  }, []);

  const handleChoiceCharacter = async (name: string, realm: string, event: any) => {
    event.preventDefault();
    toast.promise(
      async () => {
        const character = await fetchCharacter(name, realm);
        await update(character);
        return character;
      },
      {
        loading: 'Chargement en cours, veuillez patienter',
        error:
          'Veuillez vous connecter avec votre personnage dans le jeu avant de le sélectionner.',
      },
    );
  };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="flex items-center">
        <Users className="ml-1 mr-3 h-6 w-6" />
        Mes personnages
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="w-44 border border-gray-300 shadow-lg">
        {loading ? (
          <DropdownMenuItem>
            <LoaderIcon className="animate-spin" /> <span className="ml-2">Chargement...</span>
          </DropdownMenuItem>
        ) : (
          listCharacters.map((realm) => (
            <DropdownMenuSub key={realm.realm}>
              <DropdownMenuSubTrigger className="capitalize">{realm.realm}</DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="border border-gray-300 shadow-lg">
                {realm.characters.map((character) => (
                  <DropdownMenuItem
                    key={character.name}
                    onSelect={(event) =>
                      handleChoiceCharacter(character.name, character.realm, event)
                    }
                  >
                    {character.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          ))
        )}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}

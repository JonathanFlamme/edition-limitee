import React, { useEffect, useState } from 'react';
import { listCharacter } from '@/@type/type';
import { fetchCharacter, fetchCharacters } from '@/src/utils/characters';

import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Users } from 'lucide-react';

import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/src/components/ui/dropdown-menu';
import { Spinner } from '@nextui-org/react';

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
        <Users className="mr-2 h-4 w-4" />
        Mes personnages
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="w-44 border border-gray-300 shadow-lg">
        {loading ? (
          <DropdownMenuItem>
            <Spinner size="sm" label="Chargement..." color="default" />
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

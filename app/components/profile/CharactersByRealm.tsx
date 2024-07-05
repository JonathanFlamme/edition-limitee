import React, { useState } from 'react';
import { listCharacter } from '@/@type/type';
import { fetchCharacter, fetchCharacters } from '@/utils/characters';
import { jost } from '@/utils/font';
import { Modal } from '@mui/material';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export default function CharactersByRealm() {
  const { data: session, update } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const [listCharacter, setListCharacter] = useState<listCharacter[]>([]);

  const handleCloseModal = () => setOpenModal(false);

  const handleOpenModal = async () => {
    setOpenModal(true);
    const list: listCharacter[] = await fetchCharacters();
    setListCharacter(list);
  };

  const handleChoiceCharacter = async (name: string, realm: string) => {
    toast.promise(
      async () => {
        const character = await fetchCharacter(name, realm);
        await update(character);
        setOpenModal(false);
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
    <>
      <div
        onClick={handleOpenModal}
        className="cursor-pointer text-xl my-2 text-white hover:text-gray-300"
      >
        Changer de personnage
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="grid grid-cols-4 text-white rounded-lg bg-gray-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {listCharacter.map((realm) => (
            <div key={realm.realm} className={`${jost.className} p-4 text-center`}>
              <p className="capitalize text-xl mb-4 text-center bg-blue-400 text-gray-800 py-2 px-4 rounded-lg ">
                {realm.realm}
              </p>
              <ul>
                {realm.characters.map((character) => (
                  <li key={character.name}>
                    <button
                      onClick={() => handleChoiceCharacter(character.name, character.realm)}
                      className="mt-2 text-xl cursor-pointer text-white hover:text-blue-400 transition duration-200"
                    >
                      {character.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}

import { listCharacter } from '@/@type/type';
import { fetchCharacters } from '@/utils/characters';
import { jost } from '@/utils/font';
import { Modal } from '@mui/material';
import React, { useState } from 'react';

export default function CharactersByRealm() {
  const [openModal, setOpenModal] = useState(false);
  const [listCharacter, setListCharacter] = useState<listCharacter[]>([]);

  const handleOpenModal = async () => {
    setOpenModal(true);
    const list: listCharacter[] = await fetchCharacters();
    setListCharacter(list);
  };
  const handleCloseModal = () => setOpenModal(false);

  const handleChoiceCharacter = (characterName: string) => {
    console.log('choice character', characterName);
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
                      onClick={() => handleChoiceCharacter(character.name)}
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
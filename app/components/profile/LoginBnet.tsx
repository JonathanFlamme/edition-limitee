import { jost } from '@/utils/font';
import { faBattleNet } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

export default function LoginBnet() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div>
      <Button
        className=" mt-4 md:mt-6 mr-2 py-2 text-sm cursor-pointer"
        variant="contained"
        onClick={handleOpenModal}
      >
        <FontAwesomeIcon className=" text-2xl md:text-xl md:mr-2" icon={faBattleNet} />
        <span className="hidden md:block">Connexion Bnet</span>
      </Button>
      <Modal open={openModal} onClose={handleCloseModal}>
        <div
          className={`${jost.className} flex flex-col items-center text-white border-gray-500 border-2 rounded-lg shadow-lg bg-gray-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
        >
          <p className="m-4 text-xl">
            Vous allez être redirigé vers Battle.net pour vous connecter de manière sécurisée.
          </p>
          <p className="m-4 text-lg">Veuillez suivre les instructions à l’écran pour continuer.</p>
          <Button className="m-4" variant="contained" onClick={() => signIn('battlenet')}>
            <FontAwesomeIcon className="text-xl mr-2" icon={faBattleNet} />
            Battle.net
          </Button>
           <p className="mb-4 text-sm text-gray-300">
            Note : Le site Édition Limitée ne conserve aucune de vos données personnelles.
          </p>
        </div>
      </Modal>
    </div>
  );
}

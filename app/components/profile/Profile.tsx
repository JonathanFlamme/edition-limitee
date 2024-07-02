import React, { useState } from 'react';
import Image from 'next/image';

import { useSession } from 'next-auth/react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logout from './Logout';
import { Popper } from '@mui/material';
import CharactersByRealm from './CharactersByRealm';
import { jost } from '@/utils/font';

export default function Profile() {
  const { data: session } = useSession();
  const [anchorElSetting, setAnchorElSetting] = useState<HTMLParagraphElement | null>(null);

  if (!session) {
    return null;
  }

  const handleOpenSetting = (event: React.MouseEvent<HTMLParagraphElement>) => {
    setAnchorElSetting(anchorElSetting ? null : event.currentTarget);
  };

  const isPopoverOpenSetting = Boolean(anchorElSetting);

  return (
    <div>
      <div
        className="cursor-pointer md:flex md:mt-4 hover:text-gray-300"
        onClick={handleOpenSetting}
      >
        <Image
          className="rounded-full border-4 border-gray-500 mr-2 mt-2  md:mb-2 md:mt-0"
          src={session.character?.avatar ?? ''}
          alt="avatar"
          width={60}
          height={60}
        />
        <div className="hidden cursor-pointer md:flex md:flex-col justify-center hover:text-gray-300">
          <p>
            {session.character?.name}
            <FontAwesomeIcon
              className="text-white md:mt-1 md:ml-1"
              width={20}
              icon={faChevronDown}
            />
          </p>
          <p className="capitalize text-lg">{session.character?.realm}</p>
        </div>

        {/* Popover for setting */}
        <Popper
          open={isPopoverOpenSetting}
          anchorEl={anchorElSetting}
          onClick={(e) => e.stopPropagation()}
          placement="bottom"
        >
          <div
            className={`${jost.className} border-gray-400 border-2 rounded-lg shadow-lg py-2 px-4 bg-gray-600 mt-3`}
          >
            <CharactersByRealm />
            <Logout />
          </div>
        </Popper>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import Image from 'next/image';

import { useSession } from 'next-auth/react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popover from '@mui/material/Popover';
import Logout from './Logout';

export default function Profile() {
  const { data: session } = useSession();
  const [AnchorElSetting, setAnchorElSetting] = useState<HTMLParagraphElement | null>(null);

  if (!session) {
    return null;
  }

  const handleOpenSetting = (event: React.MouseEvent<HTMLParagraphElement>) => {
    setAnchorElSetting(event.currentTarget);
  };
  const handleCloseSetting = () => {
    setAnchorElSetting(null);
  };
  const isPopoverOpenSetting = Boolean(AnchorElSetting);

  return (
    <div>
      <div
        className="cursor-pointer md:flex md:mt-4 hover:text-gray-300"
        onClick={handleOpenSetting}
      >
        <Image
          className="rounded-full border-4 border-gray-500 mr-2 mt-2 md:mt-0"
          src={session.member?.avatar}
          alt="avatar"
          width={60}
          height={60}
        />
        <p className="hidden cursor-pointer md:flex md:mt-3 hover:text-gray-300">
          {session.member?.name}
          <FontAwesomeIcon className="text-white md:mt-1 md:ml-1" width={20} icon={faChevronDown} />
        </p>

        {/* Popover for setting */}
        <Popover
          open={isPopoverOpenSetting}
          anchorEl={AnchorElSetting}
          onClose={handleCloseSetting}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          slotProps={{
            paper: {
              className: 'border-gray-500 border-2 rounded-lg shadow-lg py-2 px-4 bg-gray-600',
            },
          }}
        >
          <Logout />
        </Popover>
      </div>
    </div>
  );
}

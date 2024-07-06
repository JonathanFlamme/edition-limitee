import React, { useState } from 'react';

import { useSession } from 'next-auth/react';
import Logout from './Logout';
import { Popper } from '@mui/material';
import CharactersByRealm from './CharactersByRealm';
import { jost } from '@/utils/font';
import { User } from '@nextui-org/user';

export default function Profile() {
  const { data: session } = useSession();
  const [anchorElSetting, setAnchorElSetting] = useState<HTMLParagraphElement | null>(null);

  const handleOpenSetting = (event: React.MouseEvent<HTMLParagraphElement>) => {
    setAnchorElSetting(anchorElSetting ? null : event.currentTarget);
  };

  const isPopoverOpenSetting = Boolean(anchorElSetting);

  return (
    <div>
      <User
        onClick={handleOpenSetting}
        name={session?.character?.name}
        description={session?.character?.realm}
        avatarProps={{
          src: session?.character?.avatar,
          size: 'lg',
          radius: 'lg',
        }}
        classNames={{
          base: 'cursor-pointer text-xl mt-3 mr-1 md:mr-0 md:mt-4 hover:text-gray-300',
          name: 'text-xl hidden md:block',
          description: 'capitalize text-sm hidden md:block',
        }}
      />

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
  );
}

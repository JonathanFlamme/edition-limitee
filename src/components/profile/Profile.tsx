import React, { useState } from 'react';
import { LogOut as LogOutLucide } from 'lucide-react';
import { Settings as SettingsIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Logout from './Logout';
import CharactersByRealm from './CharactersByRealm';
import { jost } from '@/src/utils/font';
import { User } from '@nextui-org/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { Role } from '@/@type/role.enum';

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();

  const [anchorElSetting, setAnchorElSetting] = useState<HTMLParagraphElement | null>(null);

  const handleOpenSetting = (event: React.MouseEvent<HTMLParagraphElement>) => {
    setAnchorElSetting(anchorElSetting ? null : event.currentTarget);
  };

  const isPopoverOpenSetting = Boolean(anchorElSetting);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <User
          onClick={handleOpenSetting}
          name={session?.character?.name}
          description={session?.character?.realm}
          avatarProps={{
            src: session?.character?.avatar || '',
            size: 'lg',
            radius: 'lg',
          }}
          classNames={{
            base: 'cursor-pointer text-xl mt-3 mr-1 md:mr-0 md:mt-4 hover:text-gray-300',
            name: 'text-xl hidden md:block',
            description: 'capitalize text-sm hidden md:block',
          }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`${jost.className} w-56 border border-gray-300 shadow-lg`}>
        <DropdownMenuLabel>
          <span className="text-lg">{session?.character.name}</span> @{' '}
          <span className="capitalize text-sm text-gray-600">{session?.character.realm}</span>
          <p className="capitalize text-xs text-gray-500">{session?.character.role}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <CharactersByRealm />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {session?.character?.role === Role.Officier ? (
          <DropdownMenuItem onClick={() => router.push('/settings')}>
            <SettingsIcon className="mr-2 h-4 w-4" />
            <span>Paramètres</span>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem>
          <LogOutLucide className="mr-2 h-4 w-4" />
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

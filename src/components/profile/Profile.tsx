import React, { useState } from 'react';
import { LogOut as LogOutLucide, Users } from 'lucide-react';
import { Settings as SettingsIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Logout from './Logout';
import CharactersByRealm from './CharactersByRealm';
import { jost } from '@/src/utils/font';
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
import { Avatar, AvatarImage } from '@/src/components/ui/avatar';
import MythicIcon from '@/assets/icons/mythic.svg';
import MemberIcon from '@/assets/icons/member.svg';

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();

  const [anchorElSetting, setAnchorElSetting] = useState<HTMLParagraphElement | null>(null);

  const handleOpenSetting = (event: React.MouseEvent<HTMLParagraphElement>) => {
    setAnchorElSetting(anchorElSetting ? null : event.currentTarget);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div
          onClick={handleOpenSetting}
          className={
            session?.character.role !== Role.Membre && session?.character.role !== Role.Officier
              ? `cursor-pointer flex mt-3 mr-1 md:mr-0 md:mt-4 hover:text-gray-300`
              : `cursor-pointer flex mt-2 mr-1 md:mr-0 md:mt-3 hover:text-gray-300`
          }
        >
          <Avatar
            className={
              session?.character.role !== Role.Membre && session?.character.role !== Role.Officier
                ? 'w-14 h-14 rounded-xl'
                : 'mt-1 md:mt-0 w-10 h-10 rounded-xl'
            }
          >
            <AvatarImage src={session?.character?.avatar || ''} alt="image profil bnet" />
          </Avatar>
          <div className="ml-2">
            <p
              className={
                session?.character.role !== Role.Membre && session?.character.role !== Role.Officier
                  ? `text-xl mt-1 hidden md:block`
                  : `text-base hidden md:block`
              }
            >
              {session?.character?.name}
            </p>
            <p className={`text-gray-400 capitalize text-sm hidden md:block`}>
              {session?.character?.realm}
            </p>
          </div>
        </div>
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
          {session?.character?.role === Role.Officier ||
          session?.character?.role === Role.Membre ? (
            <>
              <DropdownMenuItem className="cursor-pointer " onClick={() => router.push('/members')}>
                <MemberIcon className="mr-3 h-8 w-8" />
                <span>Membres</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer "
                onClick={() => router.push('/mythic-plus')}
              >
                <MythicIcon className="mr-2 h-8 w-8" />
                <span>Mythique +</span>
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {session?.character?.role === Role.Officier ? (
          <DropdownMenuItem onClick={() => router.push('/settings')}>
            <SettingsIcon className="ml-1 mr-3 h-6 w-6" />
            <span>Paramètres</span>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem>
          <LogOutLucide className="ml-1 mr-3 h-6 w-6" />
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

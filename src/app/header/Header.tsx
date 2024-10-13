'use client';
import { usePathname } from 'next/navigation';
import HeaderMember from './HeaderMember';
import HeaderPresentation from './HeaderPresentation';
import { useSession } from 'next-auth/react';
import { Role } from '@/@type/role.enum';

export default function Header() {
  const { data: session } = useSession();

  return (
    <div>
      {session?.character.role === Role.Membre || session?.character.role === Role.Officier ? (
        <HeaderMember />
      ) : (
        <HeaderPresentation />
      )}
    </div>
  );
}

'use client';
import { usePathname } from 'next/navigation';
import HeaderMember from './HeaderMember';
import HeaderPresentation from './HeaderPresentation';

export default function Header() {
  const pathname = usePathname();

  return <div>{pathname === '/' ? <HeaderPresentation /> : <HeaderMember />}</div>;
}

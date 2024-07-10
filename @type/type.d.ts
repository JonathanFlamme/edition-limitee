import NextAuth from 'next-auth';
import 'next-auth/jwt';
import { Role } from './role.enum';

declare module 'next-auth' {
  interface Session {
    access_token?: string;
    character: Character;
    test?: string;
  }
}

interface Character {
  name: string;
  realm: string;
  id: number;
  role: Role;
  rank?: number;
  avatar: string;
}

interface listCharacter {
  realm: string;
  characters: Character[];
}

interface searchMembersType {
  image: StaticImageData;
  title: string;
  classes: string[];
}

interface contactType {
  name: string;
  bnet: string;
}

interface PresentationType {
  text: string;
}

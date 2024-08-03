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

interface GuildType {
  id: string;
  name: string;
  officierEmails: string[];
  contact: ContactType[];
  presentation: PresentationType[];
  presentationBack: PresentationBackType[];
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

interface SearchType {
  id: string;
  image: StaticImageData;
  name: string;
  order: number;
  classes: string[];
}

interface ContactType {
  id: string;
  name: string;
  order?: number;
  bnet: string;
  guildId: string;
}

interface PresentationType {
  id: string;
  name: string;
  order?: number;
}
interface PresentationBackType {
  name: string;
  order?: number;
}

interface GalerieType {
  id: string;
  name: string;
  url: string;
}

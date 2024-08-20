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
  mythicDescription?: string;
  mythicTarget?: number;
  contact: ContactType[];
  presentation: PresentationType[];
  presentationBack: PresentationBackType[];
  members: MemberType[];
}

interface MemberType {
  id: string;
  avatar?: string;
  characterId: number;
  name: string;
  realm: string;
  rank: number;
  ilvl?: number;
  mythicRating?: number;
  colorRating?: { r: number; g: number; b: number; a: number };
  periodIdMythic?: number;
  achievements?: number;
  mythics: MythicType[];
}

interface MythicType {
  id: string;
  mythicId: number;
  name: string;
  period: number;
  date: Date;
  completedTime: Date;
  finished: boolean;
  key: number;
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

interface GuildResponse {
  guild: GuildType;
  members: MemberType[];
  week: { startWeek: string; endWeek: string; period: number };
}

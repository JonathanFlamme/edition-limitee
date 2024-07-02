import NextAuth from 'next-auth';
import 'next-auth/jwt';

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
  role: string;
  rank?: number;
  avatar: string;
}

interface listCharacter {
  realm: string;
  characters: Character[];
}

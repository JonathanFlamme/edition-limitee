import NextAuth from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    access_token?: string;
    member: {
      name: string;
      id: string;
      rank: string;
      role: string;
      avatar: string;
    };
  }
}

interface Character {
  name: string;
  id: number;
  realm: string;
  role: string;
  rank: number;
  avatar?: string;
}

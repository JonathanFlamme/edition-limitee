import { Role } from '@/@type/role.enum';
import { Character } from '@/@type/type';
import type { NextAuthOptions } from 'next-auth';
import BattleNetProvider from 'next-auth/providers/battlenet';

export const authOptions: NextAuthOptions = {
  providers: [
    BattleNetProvider({
      clientId: process.env.BATTLENET_CLIENT_ID as string,
      clientSecret: process.env.BATTLENET_CLIENT_SECRET as string,
      issuer: 'https://eu.battle.net/oauth',
      authorization: {
        params: {
          scope: 'openid wow.profile',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, session, account }) {
      // ---------- UPDATE SESSION ---------- //
      if (trigger === 'update' && session) {
        token.isUpdated = true;
        token.character = session.character;
        return { ...token, ...session };
      }
      // ---------- END UPDATE SESSION ---------- //

      if (!account) {
        return token;
      }

      return {
        ...token,
        access_token: account.access_token,
      };
    },
    async session({ session, token, trigger }) {
      if (!token.access_token) {
        return session;
      }

      // ---------- UPDATE SESSION ---------- //
      if (token.isUpdated === true) {
        session.character = token.character as Character;
        token.isUpdated = false;
        return session;
      }
      // ---------- END UPDATE SESSION ---------- //

      // ---------- GET USER ACCOUNT INFO ---------- //
      const profileResponse = await fetch('https://eu.api.blizzard.com/profile/user/wow', {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          'Battlenet-Namespace': 'profile-eu',
        },
      });
      if (!profileResponse.ok) throw new Error('Failed to get user info');
      const profile = await profileResponse.json();

      // ---------- GET LIST CHARACTER IN EDITION LIMITEE ---------- //
      const listCharacter: Character[] = profile.wow_accounts[0].characters.map(
        (character: any) => {
          return {
            name: character.name,
            id: character.id,
            realm: character.realm.slug,
            rank: 10,
            role: Role.Guest,
          };
        },
      );
      // console.log('listCharacter', profile.wow_accounts[0].characters);
      // ---------- GET MEMBER GUILD ---------- //
      const memberResponse = await fetch(
        'https://eu.api.blizzard.com/data/wow/guild/elune/%C3%A9dition-limit%C3%A9e/roster?namespace=profile-eu',
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            'Battlenet-Namespace': 'profile-eu',
          },
        },
      );
      if (!memberResponse.ok) throw new Error('Failed to get roster info');
      const roster = await memberResponse.json();

      const members: Character[] = roster.members.map((member: any) => {
        return {
          name: member.character.name,
          id: member.character.id,
          realm: member.character.realm.slug,
          rank: member.rank,
          role: Role.Guest,
        };
      });

      // ---------- SEARCH MEMBER IN GUILD ---------- //
      const isMember = members
        .filter((member: Character) =>
          listCharacter.some((character: Character) => member.id === character.id),
        )
        .sort((a: any, b: any) => a.rank - b.rank)
        .shift();

      // ---------- CHECK RANK OF MEMBER IN GUILD ---------- //
      let character: Character;

      if (isMember) {
        character = {
          name: isMember.name,
          id: isMember.id,
          realm: isMember.realm,
          rank: isMember.rank ?? 10,
          role: (isMember.rank ?? 10) <= 4 ? Role.Officier : Role.Membre,
          avatar: '',
        };
      } else {
        character = listCharacter[0];
      }

      // ---------- GET IMAGE CHARACTER ---------- //

      const characterMediaResponse = await fetch(
        `https://eu.api.blizzard.com/profile/wow/character/${character.realm}/${character.name.toLowerCase()}/character-media`,
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            'Battlenet-Namespace': 'profile-eu',
          },
        },
      );
      if (!characterMediaResponse.ok) throw new Error('Failed to get character media');
      const characterMedia = await characterMediaResponse.json();
      return {
        ...session,
        access_token: token.access_token,
        character: { ...character, avatar: characterMedia.assets[0].value },
      };
    },
  },
};

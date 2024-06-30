import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../lib/auth';
import { Character, listCharacter } from '@/@type/type';

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }

  const response = await fetch('https://eu.api.blizzard.com/profile/user/wow', {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      'Battlenet-Namespace': 'profile-eu',
    },
  });
  if (!response.ok) throw new Error('Failed to get user info');
  const profile = await response.json();

  const characters: Character[] = profile.wow_accounts[0].characters.map((character: any) => {
    return {
      name: character.name,
      realm: character.realm.slug,
    };
  });

  const realms: Record<string, Character[]> = {};

  characters.forEach((character) => {
    if (!realms[character.realm]) {
      realms[character.realm] = [];
    }
    realms[character.realm].push(character);
  });

  const listByRealm: listCharacter[] = Object.keys(realms).map((realm) => ({
    realm,
    characters: realms[realm],
  }));

  return NextResponse.json(listByRealm);
}

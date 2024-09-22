import { authOptions } from '@/src/lib/auth';
import { Role } from '@/@type/role.enum';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { HttpError } from '@/src/utils/customError';
import { MemberType } from '@/@type/type';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session?.character?.role !== Role.Officier) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  // ---------- GET CHARACTER ---------- //
  const response = await fetch(
    `https://eu.api.blizzard.com/profile/wow/character/${body.realm?.toLowerCase()}/${body.name?.toLowerCase()}?namespace=profile-eu`,
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Battlenet-Namespace': 'profile-eu',
      },
    },
  );
  if (!response.ok) throw new HttpError('Failed to get character info', response.status);

  const character = await response.json();

  // ---------- GET IMAGE CHARACTER ---------- //

  const characterMediaResponse = await fetch(character.media.href, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      'Battlenet-Namespace': 'profile-eu',
    },
  });

  if (!characterMediaResponse.ok)
    throw new HttpError('Failed to get character media', characterMediaResponse.status);
  const characterMedia = await characterMediaResponse.json();

  const member: Partial<MemberType> = {
    avatar: characterMedia?.assets[0]?.value,
    characterId: character.id,
    name: character.name,
    realm: character.realm.slug,
    class: character.character_class.name.fr_FR,
  };

  return NextResponse.json(member);
}

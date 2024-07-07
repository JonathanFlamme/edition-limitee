import { Role } from '@/@type/role.enum';
import { Character } from '@/@type/type';
import { authOptions } from '@/src/lib/auth';
import { HttpError } from '@/src/utils/customError';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<void | NextResponse> {
  try {
    const { searchParams } = req.nextUrl;
    const name = searchParams.get('name');
    const realm = searchParams.get('realm');

    let session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(
      `https://eu.api.blizzard.com/profile/wow/character/${realm?.toLowerCase()}/${name?.toLowerCase()}?namespace=profile-eu`,
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Battlenet-Namespace': 'profile-eu',
        },
      },
    );
    if (!response.ok) throw new HttpError('Failed to get character info', response.status);

    const character = await response.json();

    // ---------- GET MEMBER GUILD ---------- //
    const memberResponse = await fetch(
      'https://eu.api.blizzard.com/data/wow/guild/elune/%C3%A9dition-limit%C3%A9e/roster?namespace=profile-eu',
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Battlenet-Namespace': 'profile-eu',
        },
      },
    );
    if (!memberResponse.ok)
      throw new HttpError('Failed to get guild roster', memberResponse.status);
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

    const isMember = members.find((member: Character) => member.id === character.id);

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

    session = {
      ...session,
      character: {
        name: character.name,
        id: character.id,
        realm: character.realm.slug,
        role: !isMember ? Role.Guest : (isMember?.rank ?? 10) <= 4 ? Role.Officier : Role.Membre,
        avatar: characterMedia?.assets[0]?.value,
      },
    };
    return NextResponse.json({ session });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

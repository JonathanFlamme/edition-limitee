import { Character } from '@/@type/type';
import { authOptions } from '@/app/lib/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const name = searchParams.get('name');
    const realm = searchParams.get('realm');

    let session = await getServerSession(authOptions);
    if (!session) {
      return null;
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
    if (!response.ok) throw new Error('Failed to get character info');

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
    if (!memberResponse.ok) throw new Error('Failed to get roster info');
    const roster = await memberResponse.json();

    const members: Character[] = roster.members.map((member: any) => {
      return {
        name: member.character.name,
        id: member.character.id,
        realm: member.character.realm.slug,
        rank: member.rank,
        role: 'guest',
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

    if (!characterMediaResponse.ok) throw new Error('Failed to get character media');
    const characterMedia = await characterMediaResponse.json();

    session = {
      ...session,
      character: {
        name: character.name,
        id: character.id,
        realm: character.realm.slug,
        role: !isMember ? 'guest' : (isMember?.rank ?? 10) <= 4 ? 'officier' : 'membre',
        avatar: characterMedia?.assets[0]?.value,
      },
    };
    return NextResponse.json({ session });
  } catch (error) {
    console.error(error);
  }
}

import prisma from '@/src/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { Role } from '@/@type/role.enum';
import { HttpError } from '@/src/utils/customError';
import { MemberType } from '@/@type/type';

export async function GET() {
  const roster = await prisma.member.findMany();
  return NextResponse.json(roster);
}

export async function POST() {
  const session = await getServerSession(authOptions);
  if (session?.character?.role !== Role.Officier) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ---------- GET MEMBER GUILD ---------- //
  const res = await fetch(
    'https://eu.api.blizzard.com/data/wow/guild/elune/%C3%A9dition-limit%C3%A9e/roster',
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Battlenet-Namespace': 'profile-eu',
      },
    },
  );
  if (!res.ok) throw new HttpError('Failed to get guild roster', res.status);
  const guildBnet = await res.json();

  const rosters: MemberType[] = guildBnet.members
    .filter(
      (member: MemberType) =>
        member.rank === 0 || member.rank === 2 || (member.rank >= 4 && member.rank <= 6),
    )
    .map((member: any) => ({
      avatar: '',
      characterId: member.character.id,
      name: member.character.name,
      realm: member.character.realm.slug,
      rank: member.rank,
      ilvl: 0,
      achievements: 0,
    }));

  await Promise.all(
    rosters.map(async (character) => {
      // ---------- GET IMAGE CHARACTER ---------- //
      const characterMediaResponse = await fetch(
        `https://eu.api.blizzard.com/profile/wow/character/${character.realm}/${character.name.toLowerCase()}/character-media`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Battlenet-Namespace': 'profile-eu',
          },
        },
      );

      if (!characterMediaResponse.ok) throw new Error('Failed to get character media');
      const characterMedia = await characterMediaResponse.json();

      character.avatar = characterMedia.assets[0].value.split('character/')[1];

      // ---------- GET INFO SUMMURY CHARACTER ---------- //
      const characterInfoResponse = await fetch(
        `https://eu.api.blizzard.com/profile/wow/character/${character.realm}/${character.name.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Battlenet-Namespace': 'profile-eu',
          },
        },
      );

      if (!characterInfoResponse.ok) throw new Error('Failed to get character media');
      const characterInfo = await characterInfoResponse.json();

      character.ilvl = characterInfo.equipped_item_level;
      character.achievements = characterInfo.achievement_points;

      return character;
    }),
  );

  // ---------- STORE MEMBER GUILD IN UPDATE OR CREATE BDD---------- //
  const guild = await prisma.guild.findMany();

  try {
    rosters.map(async (roster) => {
      await prisma.member.upsert({
        where: { characterId: roster.characterId },
        update: {
          avatar: roster.avatar,
          characterId: roster.characterId,
          name: roster.name,
          realm: roster.realm,
          rank: roster.rank,
          ilvl: roster.ilvl,
          achievements: roster.achievements,
        },
        create: {
          avatar: roster.avatar,
          characterId: roster.characterId,
          name: roster.name,
          realm: roster.realm,
          rank: roster.rank,
          ilvl: roster.ilvl,
          guildId: guild[0].id,
        },
      });
    });

    const updateRoster = await prisma.member.findMany();

    return NextResponse.json(updateRoster);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create new member' }, { status: 500 });
  }
}

import prisma from '@/src/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { Role, RoleEnum } from '@/@type/role.enum';
import { HttpError } from '@/src/utils/customError';

export async function POST() {
  const session = await getServerSession(authOptions);
  if (session?.character?.role !== Role.Officier) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rosters = await prisma.member.findMany();

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

      character.class = characterInfo.character_class.name.fr_FR;
      character.role = RoleEnum.Casu;
      character.ilvl = characterInfo.equipped_item_level;
      character.achievements = characterInfo.achievement_points;

      return character;
    }),
  );

  // ---------- GET CURRENTLY PERIOD ---------- //
  const resPeriodIndex = await fetch(
    'https://eu.api.blizzard.com/data/wow/mythic-keystone/period/index',
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Battlenet-Namespace': 'dynamic-eu',
      },
    },
  );
  const periodIndex = await resPeriodIndex.json();
  const currentlyPeriod = periodIndex.current_period.id;

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
          class: roster.class,
          realm: roster.realm,
          rank: roster.rank,
          ilvl: roster.ilvl,
          achievements: roster.achievements,
        },
        create: {
          avatar: roster.avatar,
          characterId: roster.characterId,
          name: roster.name,
          class: roster.class,
          realm: roster.realm,
          rank: roster.rank,
          ilvl: roster.ilvl,
          achievements: roster.achievements,
          mythicRating: roster.mythicRating,
          guildId: guild[0].id,
        },
      });
    });

    const members = await prisma.member.findMany({
      include: {
        mythics: { where: { period: currentlyPeriod }, orderBy: { key: 'desc' } },
      },
      orderBy: { mythicRating: 'desc' },
    });

    if (!members) {
      throw new HttpError('Members not found', 404);
    }
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create new member' }, { status: 500 });
  }
}

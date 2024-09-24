import { Role } from '@/@type/role.enum';
import { MythicType } from '@/@type/type';
import { authOptions } from '@/src/lib/auth';
import prisma from '@/src/lib/prisma';
import { HttpError } from '@/src/utils/customError';
import { DateTime } from 'luxon';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<void | NextResponse> {
  try {
    const { searchParams } = req.nextUrl;
    const periodParams = searchParams.get('period') || '0';

    const session = await getServerSession(authOptions);
    if (session?.character?.role !== Role.Officier && session?.character?.role !== Role.Membre) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resPeriodId = await fetch(
      `https://eu.api.blizzard.com/data/wow/mythic-keystone/period/${periodParams}`,
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Battlenet-Namespace': 'dynamic-eu',
        },
      },
    );
    const { start_timestamp, end_timestamp } = await resPeriodId.json();

    const startDateTime = DateTime.fromMillis(start_timestamp);
    const startWeek = startDateTime.toFormat('dd/MM/yyyy');

    const endDateTime = DateTime.fromMillis(end_timestamp);
    const endWeek = endDateTime.toFormat('dd/MM/yyyy');

    const week = { startWeek, endWeek, period: Number(periodParams) };

    // Get all members with their mythics
    const members = await prisma.member.findMany({
      where: {
        rank: { in: [0, 2, 4, 5, 6] },
      },
      include: {
        mythics: { where: { period: week.period }, orderBy: { key: 'desc' } },
      },
      orderBy: { mythicRating: 'desc' },
    });

    if (!members) {
      throw new HttpError('Members not found', 404);
    }
    return NextResponse.json({ members, week });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get members' }, { status: 500 });
  }
}

export async function POST(): Promise<NextResponse | undefined> {
  const session = await getServerSession(authOptions);
  if (session?.character?.role !== Role.Officier) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
  if (!resPeriodIndex.ok) {
    return NextResponse.json({ error: 'Failed to fetch period index' }, { status: 500 });
  }
  const periodIndex = await resPeriodIndex.json();
  const currentlyPeriod = periodIndex.current_period.id;

  // ---------- GET BEST RUN MYTHIC PLUS ---------- //

  const rosters = await prisma.member.findMany({ where: { rank: { in: [0, 2, 4, 5, 6] } } });

  await Promise.all(
    rosters.map(async (roster) => {
      const test = await fetch(
        `https://eu.api.blizzard.com/profile/wow/character/${roster.realm}/${roster.name.toLowerCase()}/mythic-keystone-profile`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Battlenet-Namespace': 'profile-eu',
          },
        },
      );
      if (!test.ok) {
        return console.error('Failed to fetch mythic plus data for', roster.name);
      }
      const mythicPlus = await test.json();
      const periodCharacter = mythicPlus.current_period.period.id;

      const member = await prisma.member.findUnique({
        where: {
          characterId: roster.characterId,
        },
      });
      if (!member) return null;

      const mythicsForBdd: MythicType[] = (mythicPlus.current_period?.best_runs || [])
        .sort((a: any, b: any) => b.keystone_level - a.keystone_level)
        .slice(0, 4)
        .map((mythic: any) => ({
          mythicId: mythic.dungeon.id,
          name: mythic.dungeon.name.fr_FR,
          date: new Date(mythic.completed_timestamp),
          key: mythic.keystone_level,
          memberId: member?.id,
        }));

      try {
        // if periodCharacter < period, the character has not done the mythic dungeon for the current period
        if (periodCharacter < currentlyPeriod) {
          await prisma.member.update({
            where: {
              characterId: roster.characterId,
            },
            data: {
              mythicRating: Math.floor(mythicPlus.current_mythic_rating.rating),
              colorRating: mythicPlus.current_mythic_rating.color,
            },
          });
          return null;
        }

        // if periodCharacter = period, the character has already done the mythic dungeon for the current period
        if (member.periodIdMythic === currentlyPeriod) {
          await prisma.mythic.deleteMany({
            where: {
              memberId: member.id,
              period: currentlyPeriod,
            },
          });
        }

        await prisma.member.update({
          where: {
            characterId: roster.characterId,
          },
          data: {
            periodIdMythic: currentlyPeriod,
            mythicRating: Math.floor(mythicPlus.current_mythic_rating.rating) || 0,
            colorRating: mythicPlus.current_mythic_rating.color,
          },
        });

        mythicsForBdd.map(async (mythic) => {
          await prisma.mythic.create({
            data: {
              name: mythic.name,
              date: mythic.date,
              key: mythic.key,
              period: currentlyPeriod,
              memberId: member?.id,
            },
          });
        });
      } catch (error) {
        return NextResponse.json({ error: 'Failed to create new dungeon mythic' }, { status: 500 });
      }
    }),
  );

  // Get all members with their mythics
  const guild = await prisma.guild.findUnique({
    where: { name: 'edition-limitee' },
  });
  if (!guild) {
    throw new HttpError('Guild not found', 404);
  }

  const members = await prisma.member.findMany({
    where: {
      guildId: guild.id,
    },
    include: {
      mythics: { where: { period: currentlyPeriod }, orderBy: { key: 'desc' } },
    },
    orderBy: { mythicRating: 'desc' },
  });

  if (!members) {
    throw new HttpError('Members not found', 404);
  }

  return NextResponse.json(members);
}

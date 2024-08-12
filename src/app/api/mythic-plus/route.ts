import { Role } from '@/@type/role.enum';
import { MemberType, MythicType } from '@/@type/type';
import { authOptions } from '@/src/lib/auth';
import prisma from '@/src/lib/prisma';
import { HttpError } from '@/src/utils/customError';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { on } from 'nodemailer/lib/xoauth2';

export async function GET(): Promise<NextResponse | undefined> {
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
  const period = await resPeriodIndex.json();

  const resPeriodId = await fetch(
    `https://eu.api.blizzard.com/data/wow/mythic-keystone/period/${period.current_period.id}`,
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Battlenet-Namespace': 'dynamic-eu',
      },
    },
  );
  const { start_timestamp, end_timestamp } = await resPeriodId.json();

  const guild = await prisma.guild.findUnique({
    where: { name: 'edition-limitee' },
    select: {
      id: true,
      mythicDescription: true,
      mythicTarget: true,
      members: {
        select: {
          id: true,
          name: true,
          mythicRating: true,
          colorRating: true,
          mythics: { where: { period: period.current_period.id }, orderBy: { key: 'desc' } },
        },
        orderBy: { mythicRating: 'desc' },
      },
    },
  });

  return NextResponse.json({ guild, start_timestamp, end_timestamp });
}

export async function POST(): Promise<NextResponse | undefined> {
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
      characterId: member.character.id,
      name: member.character.name,
      realm: member.character.realm.slug,
      rank: member.rank,
    }));

  // ---------- STORE MEMBER GUILD WHEN NOT YET BDD---------- //
  const guild = await prisma.guild.findMany();
  const members = await prisma.member.findMany();

  const rosterIsNotBdd = rosters.filter(
    (roster) =>
      !members.some((member) => {
        return member.characterId === roster.characterId;
      }),
  );

  try {
    if (rosterIsNotBdd.length > 0) {
      rosterIsNotBdd.map(async (roster) => {
        await prisma.member.create({
          data: {
            characterId: roster.characterId,
            name: roster.name,
            realm: roster.realm,
            rank: roster.rank,
            guildId: guild[0].id,
          },
        });
      });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create new member' }, { status: 500 });
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
  const periodIndex = await resPeriodIndex.json();
  const currentlyPeriod = periodIndex.current_period.id;

  // ---------- GET BEST RUN MYTHIC PLUS ---------- //

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
      const mythicPlus = await test.json();
      const periodCharacter = mythicPlus.current_period.period.id;

      const member = await prisma.member.findUnique({
        where: {
          characterId: roster.characterId,
        },
      });
      if (!member) return null;

      const mythicsForBdd: MythicType[] = (mythicPlus.current_period?.best_runs || [])
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

  const guildUpdate = await prisma.guild.findUnique({
    where: { name: 'edition-limitee' },
    select: {
      id: true,
      mythicDescription: true,
      mythicTarget: true,
      members: {
        select: {
          id: true,
          name: true,
          mythicRating: true,
          colorRating: true,
          mythics: { where: { period: currentlyPeriod }, orderBy: { key: 'desc' } },
        },
        orderBy: { mythicRating: 'desc' },
      },
    },
  });

  return NextResponse.json(guildUpdate);
}

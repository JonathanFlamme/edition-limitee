import { MythicType } from '@/@type/type';
import prisma from '@/src/lib/prisma';
import { DateTime } from 'luxon';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const clientId = process.env.BATTLENET_CLIENT_ID;
  const clientSecret = process.env.BATTLENET_CLIENT_SECRET;

  // Encoder en Base64 le client ID et le client secret pour l'authentification Basic
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch('https://eu.battle.net/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      scope: 'wow.profile',
    }),
  });

  if (!response.ok) {
    return new Response('Failed to obtain access token', { status: response.status });
  }

  const data = await response.json();
  console.log('data', data);

  // ---------- GET CURRENTLY PERIOD ---------- //
  const resPeriodIndex = await fetch(
    'https://eu.api.blizzard.com/data/wow/mythic-keystone/period/index',
    {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
        'Battlenet-Namespace': 'dynamic-eu',
      },
    },
  );
  if (!resPeriodIndex.ok) {
    return console.error('Failed to fetch period index');
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
            Authorization: `Bearer ${data.access_token}`,
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

  return new Response(
    `Mise à jour des mythiques fait à ${DateTime.now().toFormat('HH:mm:ss')} le ${DateTime.now().toFormat('dd/MM/yyyy')}`,
  );
}

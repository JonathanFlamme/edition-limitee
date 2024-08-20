import { Role } from '@/@type/role.enum';
import { authOptions } from '@/src/lib/auth';
import prisma from '@/src/lib/prisma';
import { DateTime } from 'luxon';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse | undefined> {
  const session = await getServerSession(authOptions);
  if (session?.character?.role !== Role.Officier && session?.character?.role !== Role.Membre) {
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
  const periodData = await resPeriodIndex.json();
  const period = periodData.current_period.id;

  const resPeriodId = await fetch(
    `https://eu.api.blizzard.com/data/wow/mythic-keystone/period/${period}`,
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

  // ---------- GET GUILD ---------- //
  const guild = await prisma.guild.findUnique({
    where: { name: 'edition-limitee' },
    select: {
      id: true,
      mythicDescription: true,
      mythicTarget: true,
    },
  });
  if (!guild) {
    return NextResponse.json({ error: 'Guild not found' }, { status: 404 });
  }

  // ---------- GET MEMBERS ---------- //
  const members = await prisma.member.findMany({
    where: {
      guildId: guild.id,
    },
    include: {
      mythics: { where: { period: period }, orderBy: { key: 'desc' } },
    },
    orderBy: { mythicRating: 'desc' },
  });

  return NextResponse.json({ guild, members, startWeek, endWeek, period });
}

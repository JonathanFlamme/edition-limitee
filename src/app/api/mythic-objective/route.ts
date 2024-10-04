import { Role } from '@/@type/role.enum';
import { MythicObserverType } from '@/@type/type';
import { authOptions } from '@/src/lib/auth';
import prisma from '@/src/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
): Promise<NextResponse<MythicObserverType | { error: string }>> {
  const session = await getServerSession(authOptions);
  if (session?.character?.role !== Role.Officier) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body: MythicObserverType = await request.json();
  const guild = await prisma.guild.findMany();

  try {
    const mythicObjective = await prisma.mythicObjective.create({
      data: {
        description: body.description,
        key: body.key,
        period: body.period,
        guildId: guild[0].id,
      },
    });
    return NextResponse.json(mythicObjective);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create mythic objective' }, { status: 500 });
  }
}

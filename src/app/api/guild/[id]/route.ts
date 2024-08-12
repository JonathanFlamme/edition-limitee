import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { Role } from '@/@type/role.enum';
import { GuildType } from '@/@type/type';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<Partial<GuildType> | { error: string }>> {
  const session = await getServerSession(authOptions);
  if (session?.character?.role !== Role.Officier) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body: GuildType = await request.json();

  const updateGuild = await prisma.guild.update({
    where: { id: params.id },
    data: {
      mythicDescription: body.mythicDescription,
      mythicTarget: body.mythicTarget,
    },
  });

  try {
    return NextResponse.json({
      mythicDescription: updateGuild.mythicDescription ?? 'Default Description',
      mythicTarget: updateGuild.mythicTarget ?? 0,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update search' }, { status: 500 });
  }
}

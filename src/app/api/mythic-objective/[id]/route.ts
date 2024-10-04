import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { Role } from '@/@type/role.enum';
import { MythicObserverType } from '@/@type/type';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<Partial<MythicObserverType> | { error: string }>> {
  const session = await getServerSession(authOptions);
  if (session?.character?.role !== Role.Officier && session?.character?.role !== Role.Membre) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body: MythicObserverType = await request.json();

  const mythicObjectiveUpdate = await prisma.mythicObjective.update({
    where: { id: params.id },
    data: {
      description: body.description,
      key: body.key,
    },
  });

  try {
    return NextResponse.json(mythicObjectiveUpdate);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update search' }, { status: 500 });
  }
}

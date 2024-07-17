import { NextRequest, NextResponse } from 'next/server';
import { Role } from '@/@type/role.enum';
import { authOptions } from '@/src/lib/auth';
import { getServerSession } from 'next-auth';
import prisma from '@/src/lib/prisma';
import { SearchType } from '@/@type/type';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<{ error: string } | { success: string }>> {
  const session = await getServerSession(authOptions);
  if (session?.character?.role !== Role.Officier) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const guild = await prisma.guild.findMany();

  try {
    await prisma.search.delete({ where: { id: params.id, guildId: guild[0].id } });
    return NextResponse.json({ success: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete search' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<SearchType | { error: string }>> {
  const session = await getServerSession(authOptions);
  if (session?.character?.role !== Role.Officier) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body: SearchType = await request.json();

  try {
    const contact = await prisma.search.update({
      where: { id: params.id },
      data: {
        ...body,
      },
    });
    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update search' }, { status: 500 });
  }
}

import { Role } from '@/@type/role.enum';
import { authOptions } from '@/src/lib/auth';
import prisma from '@/src/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (session?.character?.role !== Role.Officier) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const presentation = await prisma.presentation.findMany({ where: { id: Number(params.id) } });

  if (!presentation) {
    throw new Error('Presentation not found');
  }

  try {
    const presentation = await prisma.presentation.update({
      where: {
        id: Number(params.id),
      },
      data: body,
    });

    return NextResponse.json({ presentation });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update presentations' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (session?.character?.role !== Role.Officier) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const guild = await prisma.guild.findMany();
  try {
    await prisma.presentation.delete({
      where: {
        id: Number(params.id),
        guildId: guild[0].id,
      },
    });

    return NextResponse.json({ success: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete presentation' }, { status: 500 });
  }
}

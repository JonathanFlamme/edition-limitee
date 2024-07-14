import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';
import { authOptions } from '@/src/lib/auth';
import { getServerSession } from 'next-auth';
import { Role } from '@/@type/role.enum';

export async function GET() {
  const presentations = await prisma.presentation.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  });
  return NextResponse.json({ presentations });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session?.character?.role !== Role.Officier) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const guild = await prisma.guild.findMany();
  const order = await prisma.presentation.count({ where: { guildId: guild[0].id } });
  try {
    const presentation = await prisma.presentation.create({
      data: {
        name: body.name,
        guildId: guild[0].id,
        order: order + 1,
      },
    });

    return NextResponse.json({ presentation });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create presentation' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session?.character?.role !== Role.Officier) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const guild = await prisma.guild.findMany();
  const body = await request.json();
  try {
    await prisma.presentation.delete({
      where: {
        id: body.idToDelete,
        guildId: guild[0].id,
      },
    });

    return NextResponse.json({ success: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete presentation' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session?.character?.role !== Role.Officier) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const presentation = await prisma.presentation.findMany({ where: { id: body.id } });

  if (!presentation) {
    throw new Error('Presentation not found');
  }

  try {
    const presentation = await prisma.presentation.update({
      where: {
        id: body.id,
      },
      data: body,
    });

    return NextResponse.json({ presentation });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update presentations' }, { status: 500 });
  }
}

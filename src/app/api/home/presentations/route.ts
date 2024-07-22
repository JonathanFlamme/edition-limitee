import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';
import { authOptions } from '@/src/lib/auth';
import { getServerSession } from 'next-auth';
import { Role } from '@/@type/role.enum';
import { PresentationType } from '@/@type/type';

export async function GET() {
  const presentations = await prisma.presentation.findMany({
    orderBy: {
      order: 'asc',
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

// Update order of presentation
export async function PATCH(request: NextRequest) {
  const body: PresentationType[] = await request.json();

  try {
    const transaction = body.map((item) => {
      const itemUpdate = prisma.presentation.update({
        where: { id: item.id },
        data: {
          order: item.order,
        },
      });
      return itemUpdate;
    });
    const presentations = await prisma.$transaction(transaction);

    return NextResponse.json(presentations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update presentation' }, { status: 500 });
  }
}

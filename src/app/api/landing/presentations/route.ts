import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function GET() {
  const presentations = await prisma.presentation.findMany();
  return NextResponse.json({ presentations });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const guild = await prisma.guild.findMany();
  try {
    const presentation = await prisma.presentation.create({
      data: {
        name: body.name,
        guildId: guild[0].id,
        order: 0,
      },
    });

    return NextResponse.json({ presentation });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create presentation' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
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

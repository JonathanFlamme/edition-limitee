import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';
import { authOptions } from '@/src/lib/auth';
import { getServerSession } from 'next-auth';
import { Role } from '@/@type/role.enum';
import { ContactType } from '@/@type/type';

export async function GET() {
  const contact = await prisma.contact.findMany({
    orderBy: {
      order: 'asc',
    },
  });
  return NextResponse.json(contact);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session?.character?.role !== Role.Officier) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body: ContactType = await request.json();
  const guild = await prisma.guild.findMany();
  const order = await prisma.contact.count({ where: { guildId: guild[0].id } });

  try {
    const contact = await prisma.contact.create({
      data: {
        name: body.name,
        bnet: body.bnet,
        guildId: guild[0].id,
        order: order + 1,
      },
    });
    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}

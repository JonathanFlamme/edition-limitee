import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';
import { authOptions } from '@/src/lib/auth';
import { getServerSession } from 'next-auth';
import { Role } from '@/@type/role.enum';
import { ContactType } from '@/@type/type';
import { revalidateTag } from 'next/cache';

export async function GET(): Promise<NextResponse<ContactType[]>> {
  const contacts = await prisma.contact.findMany({
    orderBy: {
      order: 'asc',
    },
  });
  return NextResponse.json(contacts);
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ContactType | { error: string }>> {
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

    revalidateTag('contacts');
    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
): Promise<NextResponse<ContactType[] | { error: string }>> {
  const body: ContactType[] = await request.json();

  try {
    const transaction = body.map((item) => {
      const itemUpdate = prisma.contact.update({
        where: { id: item.id },
        data: {
          ...item,
        },
      });
      return itemUpdate;
    });

    const contacts = await prisma.$transaction(transaction);

    revalidateTag('contacts');
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
  }
}

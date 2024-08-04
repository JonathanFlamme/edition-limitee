import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';
import { SearchType } from '@/@type/type';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { Role } from '@/@type/role.enum';
import { revalidateTag } from 'next/cache';

export async function GET(): Promise<NextResponse<SearchType[]>> {
  const searches = await prisma.search.findMany({
    orderBy: {
      order: 'asc',
    },
  });
  return NextResponse.json(searches);
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<SearchType | { error: string }>> {
  const session = await getServerSession(authOptions);
  if (session?.character?.role !== Role.Officier) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body: SearchType = await request.json();
  const guild = await prisma.guild.findMany();
  const order = await prisma.search.count({ where: { guildId: guild[0].id } });
  try {
    const search = await prisma.search.create({
      data: {
        name: body.name,
        image: '',
        classes: body.classes,
        guildId: guild[0].id,
        order: order + 1,
      },
    });

    revalidateTag('searches');
    return NextResponse.json(search);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
): Promise<NextResponse<SearchType[] | { error: string }>> {
  const body: SearchType[] = await request.json();

  try {
    const transaction = body.map((item) => {
      const itemUpdate = prisma.search.update({
        where: { id: item.id },
        data: {
          ...item,
        },
      });
      return itemUpdate;
    });

    const contacts = await prisma.$transaction(transaction);

    revalidateTag('searches');
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update search' }, { status: 500 });
  }
}

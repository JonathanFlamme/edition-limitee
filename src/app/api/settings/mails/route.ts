import { Role } from '@/@type/role.enum';
import { GuildType } from '@/@type/type';
import { authOptions } from '@/src/lib/auth';
import prisma from '@/src/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.character?.role !== Role.Officier) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const guild = await prisma.guild.findMany();

  const mails: string[] = guild[0].officierEmails;

  return NextResponse.json(mails);
}

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session?.character?.role !== Role.Officier) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();

  const guild = await prisma.guild.findMany();
  try {
    const updateGuild = await prisma.guild.update({
      where: { id: guild[0].id },
      data: { officierEmails: body },
    });
    return NextResponse.json(updateGuild.officierEmails);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update mails' }, { status: 500 });
  }
}

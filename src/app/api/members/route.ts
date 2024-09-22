import { authOptions } from '@/src/lib/auth';
import prisma from '@/src/lib/prisma';
import { Role } from '@/@type/role.enum';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { HttpError } from '@/src/utils/customError';
import { MemberType } from '@/@type/type';
import { unknown } from 'zod';

export async function GET() {
  const roster = await prisma.member.findMany();
  return NextResponse.json(roster);
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.character?.role !== Role.Officier) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: Partial<MemberType> = await request.json();
    if (!body) {
      return NextResponse.json({ error: 'Missing body' }, { status: 400 });
    }

    // ---------- CHECK IF MEMBER EXIST ---------- //
    const members = await prisma.member.findMany();
    const isMember = members.find((member) => member.characterId === body.characterId);

    if (isMember) {
      return NextResponse.json({ error: 'Member already exist' }, { status: 400 });
    }

    const guild = await prisma.guild.findMany();

    const member = await prisma.member.create({
      data: {
        avatar: body.avatar ?? '',
        characterId: body.characterId ?? 0,
        name: body.name ?? 'unknown',
        class: body.class,
        realm: body.realm ?? 'unknown',
        guildId: guild[0].id,
      },
    });

    console.log(member);
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 });
  }
}

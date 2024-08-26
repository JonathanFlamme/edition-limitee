import { Role } from '@/@type/role.enum';
import { authOptions } from '@/src/lib/auth';
import prisma from '@/src/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (session?.character?.role !== Role.Officier) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  try {
    const member = await prisma.member.update({
      where: {
        id: params.id,
      },
      data: {
        role: body,
      },
    });
    return NextResponse.json(member);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        // P2025: Record to update not found
        return NextResponse.json({ error: 'Member not found' }, { status: 404 });
      }
      return NextResponse.json({ error: 'Failed to update member' }, { status: 500 });
    }
  }
}

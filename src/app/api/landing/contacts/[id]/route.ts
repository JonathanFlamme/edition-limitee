import { NextRequest, NextResponse } from 'next/server';
import { Role } from '@/@type/role.enum';
import { authOptions } from '@/src/lib/auth';
import { getServerSession } from 'next-auth';
import prisma from '@/src/lib/prisma';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (session?.character?.role !== Role.Officier) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const guild = await prisma.guild.findMany();

  try {
    await prisma.contact.delete({ where: { id: params.id, guildId: guild[0].id } });
    return NextResponse.json({ success: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
  }
}

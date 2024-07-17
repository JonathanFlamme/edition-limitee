import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function GET() {
  const contact = await prisma.contact.findMany({
    orderBy: {
      order: 'asc',
    },
  });
  return NextResponse.json(contact);
}

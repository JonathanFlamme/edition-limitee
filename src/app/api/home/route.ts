import prisma from '@/src/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const [presentations, contacts, searches] = await Promise.all([
    prisma.presentation.findMany({
      orderBy: {
        order: 'asc',
      },
    }),
    prisma.contact.findMany({
      orderBy: {
        order: 'asc',
      },
    }),
    prisma.search.findMany({
      orderBy: {
        order: 'asc',
      },
    }),
  ]);

  return NextResponse.json({
    presentations,
    contacts,
    searches,
  });
}

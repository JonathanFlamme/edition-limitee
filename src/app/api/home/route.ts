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

  console.log('home', presentations[0]);
  return NextResponse.json({
    presentations,
    contacts,
    searches,
  });
}

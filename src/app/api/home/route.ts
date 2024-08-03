import prisma from '@/src/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  // const [presentations, contacts, searches] = await Promise.all([
  const presentations = prisma.presentation.findMany({
    orderBy: {
      order: 'asc',
    },
  });
  // prisma.contact.findMany({
  //   orderBy: {
  //     order: 'asc',
  //   },
  // }),
  // prisma.search.findMany({
  //   orderBy: {
  //     order: 'asc',
  //   },
  // }),
  // ]);
  console.log('presentation', presentations);
  return NextResponse.json({
    presentations,
    // contacts,
    // searches,
  });
}

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function GET() {
  const search = await prisma.search.findMany();
  return NextResponse.json({ search });
}

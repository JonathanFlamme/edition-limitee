import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const search = await prisma.search.findMany();
  return NextResponse.json({ search });
}

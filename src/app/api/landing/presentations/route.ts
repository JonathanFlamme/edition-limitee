import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const presentations = await prisma.presentation.findMany();
  return NextResponse.json({ presentations });
}

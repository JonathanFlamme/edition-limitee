import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function GET() {
  const contact = await prisma.contact.findMany();
  return NextResponse.json({ contact });
}

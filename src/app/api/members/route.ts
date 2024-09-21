import prisma from '@/src/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const roster = await prisma.member.findMany();
  return NextResponse.json(roster);
}

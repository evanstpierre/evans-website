// app/api/data/route.ts
import { NextRequest, NextResponse } from 'next/server';
import info from '@/app/lib/info.json'; // ✅ new path

export async function GET() {
  return NextResponse.json({ data: info });
}
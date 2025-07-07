import { NextRequest, NextResponse } from 'next/server';
import info from '../../lib/info.json';
// mock mongodb request (only until request is fully in db)
export async function GET(req: NextRequest) {
  return NextResponse.json({ data: info });
}
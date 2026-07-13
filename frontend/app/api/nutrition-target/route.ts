import { NextResponse } from 'next/server';
import { authenticatedFetch } from '@/lib/api';

export async function GET() {
  const res = await authenticatedFetch('/nutrition-target/');
  
  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch nutrition targets' }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}

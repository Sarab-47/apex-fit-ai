import { NextResponse } from 'next/server';
import { authenticatedFetch } from '@/lib/api';

export async function GET() {
  const res = await authenticatedFetch('/workout-recommendation/');
  if (!res.ok) return NextResponse.json({ error: 'Failed to fetch' }, { status: res.status });
  const data = await res.json();
  return NextResponse.json(data);
}

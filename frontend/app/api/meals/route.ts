import { NextResponse } from 'next/server';
import { authenticatedFetch } from '@/lib/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const path = date ? `/meals/?date=${date}` : '/meals/';
  
  const res = await authenticatedFetch(path);
  if (!res.ok) return NextResponse.json({ error: 'Failed to fetch' }, { status: res.status });
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const res = await authenticatedFetch('/meals/', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (!res.ok) return NextResponse.json({ error: 'Failed to log meal' }, { status: res.status });
  const data = await res.json();
  return NextResponse.json(data);
}

import { NextRequest, NextResponse } from 'next/server';
import { authenticatedFetch } from '@/lib/api';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await authenticatedFetch('/workout-logs/', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  
  return NextResponse.json(await res.json(), { status: res.status });
}

export async function DELETE(req: NextRequest) {
  const res = await authenticatedFetch('/workout-logs/test-cleanup/', {
    method: 'DELETE',
  });
  
  return new NextResponse(null, { status: res.status });
}

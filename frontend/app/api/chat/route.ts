import { NextRequest, NextResponse } from 'next/server';
import { authenticatedFetch } from '@/lib/api';

export async function POST(req: NextRequest) {
  const body = await req.json();

  // LLM responses can take time; authenticatedFetch uses native fetch
  // which generally has a long default timeout.
  const res = await authenticatedFetch('/chat/', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  
  return NextResponse.json(await res.json(), { status: res.status });
}
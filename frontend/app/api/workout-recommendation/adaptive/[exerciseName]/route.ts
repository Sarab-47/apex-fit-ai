import { NextRequest, NextResponse } from 'next/server';
import { authenticatedFetch } from '@/lib/api';

export async function GET(req: NextRequest, { params }: { params: Promise<{ exerciseName: string }> }) {
  const { exerciseName } = await params;

  const res = await authenticatedFetch(`/workout-recommendation/adaptive/${encodeURIComponent(exerciseName)}`);
  
  return NextResponse.json(await res.json(), { status: res.status });
}

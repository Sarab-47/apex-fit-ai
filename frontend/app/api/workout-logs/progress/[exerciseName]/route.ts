import { authenticatedFetch } from '@/lib/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ exerciseName: string }> }
) {
  const { exerciseName } = await params;
  const res = await authenticatedFetch(`/workout-logs/progress/${encodeURIComponent(exerciseName)}`);
  return NextResponse.json(await res.json(), { status: res.status });
}

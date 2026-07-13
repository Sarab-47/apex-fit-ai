import { NextResponse } from 'next/server';

export async function setAuthCookie(res: NextResponse, accessToken: string) {
  res.cookies.set('token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60, // 1 hour
  });
}

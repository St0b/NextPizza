
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const sessionToken = request.cookies.get('next-auth.session-token')?.value;

  if (path.startsWith('/api')) {
    return NextResponse.next();
  }

  if (path.startsWith('/admin')) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }

    const response = await fetch(
      `${request.nextUrl.origin}/api/auth/session`,
      {
        headers: {
          cookie: `next-auth.session-token=${sessionToken}`,
        },
      }
    );

    const session = await response.json();
    
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
  }

  return NextResponse.next();
}


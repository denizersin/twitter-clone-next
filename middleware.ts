import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { env } from 'process'
import { auth_options } from './app/api/auth/[...nextauth]/route';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, respnse: NextResponse) {
    let session: any = await getToken({ secret: process.env.NEXTAUTH_SECRET, req:request });
    
    const url = request.url
    if (!session && url == env.NEXTAUTH_URL + '/') {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/:path*',
}
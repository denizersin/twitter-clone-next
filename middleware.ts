import { getSession } from 'next-auth/react'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { env } from 'process'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const session = await getSession({ req: request })
    const url = request.url
    if (!session && url==env.NEXTAUTH_URL+'/') {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/:path*',
}
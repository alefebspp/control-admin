import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('@control-token')
  const response = NextResponse.next()

  if (req.nextUrl.pathname.startsWith('/api')) {
    response.headers.append('Access-Control-Allow-Origin', '*')
    return response
  }

  if (req.nextUrl.pathname.startsWith('/login') && !token) {
    return
  }

  if (token && req.url.includes('/login')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/login', '/dashboard', '/management']
}

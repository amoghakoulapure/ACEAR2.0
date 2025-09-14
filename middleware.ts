import { updateSession } from "@/lib/supabase/middleware"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  // The `updateSession` function handles all authentication logic, 
  // including redirecting unauthenticated users to the login page.
  const response = await updateSession(request)

  // Redirect the root URL to the public transparency portal
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/public/transparency", request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (publicly accessible pages)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}

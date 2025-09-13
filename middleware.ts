import { updateSession } from "@/lib/supabase/middleware"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  // Redirect root URL to public transparency portal
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/public/transparency", request.url))
  }
  // Skip middleware for public transparency portal
  if (request.nextUrl.pathname.startsWith("/public")) {
    return NextResponse.next()
  }

  const pathname = request.nextUrl.pathname
  
  // Handle auth routes - redirect authenticated users to dashboard
  if (pathname.startsWith('/auth/login') || pathname.startsWith('/login')) {
    const response = await updateSession(request)
    
    // If updateSession doesn't redirect (meaning user is authenticated)
    const isRedirect = response && response.status >= 300 && response.status < 400
    
    if (!isRedirect) {
      console.log('[Middleware] Authenticated user on login page, redirecting to dashboard')
      const dashboardUrl = new URL('/dashboard', request.url)
      const redirectResponse = NextResponse.redirect(dashboardUrl)
      
      redirectResponse.headers.set("Cache-Control", "no-cache, no-store, must-revalidate")
      redirectResponse.headers.set("Pragma", "no-cache")
      redirectResponse.headers.set("Expires", "0")
      
      return redirectResponse
    }
    
    // User is not authenticated, let them access login page
    if (response) {
      response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate")
      response.headers.set("Pragma", "no-cache")
      response.headers.set("Expires", "0")
    }
    return response
  }
  
  // For all other routes, use the original updateSession logic
  const response = await updateSession(request)
  
  if (response) {
    response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate")
    response.headers.set("Pragma", "no-cache")
    response.headers.set("Expires", "0")
  }
  
  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
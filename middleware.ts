import { NextRequest, NextResponse } from "next/server"
import { withRateLimit, RATE_LIMIT_CONFIG } from "./lib/rate-limit"

// API route rate limits
const apiLimiter = withRateLimit({
  limit: RATE_LIMIT_CONFIG.API.STANDARD.LIMIT,
  windowInSeconds: RATE_LIMIT_CONFIG.API.STANDARD.WINDOW_SECONDS,
})

// Setup-DB specific rate limit (more restrictive since it's administrative)
const setupDbLimiter = withRateLimit({
  limit: RATE_LIMIT_CONFIG.API.ADMIN.LIMIT,
  windowInSeconds: RATE_LIMIT_CONFIG.API.ADMIN.WINDOW_SECONDS,
})

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Apply stricter rate limiting to setup-db endpoint
  if (pathname.startsWith("/api/setup-db")) {
    const response = await setupDbLimiter(request)
    if (response) return response
  }
  // Apply standard rate limiting to all other API routes
  else if (pathname.startsWith("/api/")) {
    const response = await apiLimiter(request)
    if (response) return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ["/api/:path*"],
}

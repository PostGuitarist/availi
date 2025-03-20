import { NextRequest, NextResponse } from "next/server"

/**
 * GLOBAL CONFIGURATION
 * Adjust these values to change rate limiting behavior across the application
 */
export const RATE_LIMIT_CONFIG = {
  // Default limits for different types of routes
  API: {
    STANDARD: {
      LIMIT: 60,         // 60 requests
      WINDOW_SECONDS: 60 // per minute
    }, 
    ADMIN: {
      LIMIT: 5,          // 5 requests
      WINDOW_SECONDS: 60 // per minute
    }
  },
  // Default limits for different server actions
  SERVER_ACTIONS: {
    CREATE: {
      LIMIT: 10,         // 10 creations
      WINDOW_SECONDS: 60 // per minute
    },
    READ: {
      LIMIT: 60,         // 60 reads
      WINDOW_SECONDS: 60 // per minute
    },
    UPDATE: {
      LIMIT: 30,         // 30 updates
      WINDOW_SECONDS: 60 // per minute
    }
  },
  // HTTP status code for rate limit exceeded
  HTTP_STATUS_CODE: 429,
  // HTTP headers for rate limiting
  HEADERS: {
    LIMIT: "X-RateLimit-Limit",
    REMAINING: "X-RateLimit-Remaining", 
    RESET: "X-RateLimit-Reset",
    RETRY_AFTER: "Retry-After"
  }
}

/**
 * Configuration interface for rate limiting
 */
export interface RateLimitConfig {
  limit: number              // Maximum number of requests allowed within the window
  windowInSeconds: number    // Time window in seconds
  identifier?: (req: NextRequest) => string | Promise<string> // Optional custom identifier function
}

/**
 * Internal state for tracking rate limits
 */
interface RateLimitState {
  tokens: number      // Number of tokens currently available
  lastRefill: number  // Timestamp of the last token refill
}

// In-memory store for rate limit state
// Note: For production with multiple instances, use Redis or another distributed storage
const rateLimitStore = new Map<string, RateLimitState>()

/**
 * Calculates a timestamp in the future by adding seconds
 */
function calculateFutureTimestamp(secondsToAdd: number): number {
  return Date.now() + secondsToAdd * 1000
}

/**
 * Extracts client identifier from request (defaults to IP address)
 */
function getClientIdentifier(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  return forwarded ? forwarded.split(',')[0].trim() : "anonymous"
}

/**
 * Token bucket algorithm for rate limiting
 * - Each client has a bucket of tokens
 * - Each request consumes one token
 * - Tokens are refilled over time at a steady rate
 * - If the bucket is empty, requests are rejected
 */
export async function checkRateLimit(
  req: NextRequest,
  config: RateLimitConfig
): Promise<{
  success: boolean    // Whether the request is allowed
  limit: number       // Total limit of the bucket
  remaining: number   // Remaining tokens
  reset: number       // Timestamp when a token will be available again
}> {
  const { limit, windowInSeconds } = config
  const now = Date.now()
  
  // Get client identifier
  const identifierFn = config.identifier || getClientIdentifier
  const identifier = await identifierFn(req)
  
  // Get current state or create new bucket for this client
  const state = rateLimitStore.get(identifier) || {
    tokens: limit,
    lastRefill: now,
  }
  
  // Calculate token refill since last request
  const secondsSinceLastRefill = (now - state.lastRefill) / 1000
  const refillRate = limit / windowInSeconds
  const tokensToAdd = Math.floor(secondsSinceLastRefill * refillRate)
  
  // Refill the bucket (up to the limit)
  const refilled = Math.min(limit, state.tokens + tokensToAdd)
  
  // Update last refill time only if we added tokens
  const newLastRefill = tokensToAdd > 0 ? now : state.lastRefill
  
  // Check if we have tokens available
  const allowed = refilled > 0
  
  // Consume a token if allowed
  const remaining = allowed ? refilled - 1 : refilled
  
  // Calculate when the next token will be available
  const secondsPerToken = windowInSeconds / limit
  const resetTime = allowed
    ? calculateFutureTimestamp(secondsPerToken)
    : calculateFutureTimestamp((1 - (remaining % 1)) * secondsPerToken)
  
  // Update the state in the store
  rateLimitStore.set(identifier, {
    tokens: remaining,
    lastRefill: newLastRefill,
  })
  
  return {
    success: allowed,
    limit,
    remaining: Math.floor(remaining),
    reset: resetTime,
  }
}

/**
 * Creates middleware for rate limiting API routes
 */
export function withRateLimit(config: RateLimitConfig) {
  return async function rateLimitMiddleware(
    request: NextRequest
  ): Promise<NextResponse | undefined> {
    const result = await checkRateLimit(request, config)
    
    if (!result.success) {
      const response = NextResponse.json(
        {
          success: false,
          error: "Too many requests",
          message: "Rate limit exceeded, please try again later",
        },
        { status: RATE_LIMIT_CONFIG.HTTP_STATUS_CODE }
      )
      
      // Set standard rate limit headers
      response.headers.set(RATE_LIMIT_CONFIG.HEADERS.LIMIT, result.limit.toString())
      response.headers.set(RATE_LIMIT_CONFIG.HEADERS.REMAINING, result.remaining.toString())
      response.headers.set(RATE_LIMIT_CONFIG.HEADERS.RESET, result.reset.toString())
      response.headers.set(
        RATE_LIMIT_CONFIG.HEADERS.RETRY_AFTER, 
        Math.ceil((result.reset - Date.now()) / 1000).toString()
      )
      
      return response
    }
    
    return undefined
  }
}

/**
 * Wraps server actions with rate limiting
 */
export function withActionRateLimit<T extends (...args: any[]) => Promise<any>>(
  action: T,
  config: RateLimitConfig
) {
  return async function rateLimitedAction(...args: Parameters<T>): Promise<ReturnType<T>> {
    // Create a dummy request with an identifier based on the first argument
    // This is necessary because server actions don't have access to the real request
    const req = new NextRequest("https://dummy-url", {
      headers: {
        "x-forwarded-for": (() => {
          // Try to extract a meaningful identifier from arguments
          if (args[0]) {
            if (typeof args[0] === "string") return args[0]
            if (args[0].id) return args[0].id
            if (args[0].meetingId) return args[0].meetingId
          }
          return "server-action"
        })(),
      },
    })
    
    const result = await checkRateLimit(req, config)
    
    if (!result.success) {
      throw new Error("Rate limit exceeded, please try again later")
    }
    
    return action(...args)
  }
}

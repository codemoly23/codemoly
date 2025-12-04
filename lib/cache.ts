// Cache configuration for Next.js API routes and data fetching

// Revalidation times in seconds
export const CACHE_TIMES = {
  // Short cache for frequently updated data
  SHORT: 60, // 1 minute

  // Medium cache for moderately updated data
  MEDIUM: 300, // 5 minutes

  // Long cache for rarely updated data
  LONG: 3600, // 1 hour

  // Very long cache for static content
  STATIC: 86400, // 24 hours
} as const;

// Cache tags for targeted revalidation
export const CACHE_TAGS = {
  SETTINGS: "settings",
  SERVICES: "services",
  PRODUCTS: "products",
  EVENTS: "events",
  BLOG: "blog",
  BLOG_CATEGORIES: "blog-categories",
  MEDIA: "media",
} as const;

// Helper function to get cache config for fetch
export function getCacheConfig(
  revalidate: number = CACHE_TIMES.MEDIUM,
  tags?: string[]
) {
  return {
    next: {
      revalidate,
      tags,
    },
  };
}

// Simple in-memory rate limiter for API routes
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(
  key: string,
  limit: number = 100,
  windowMs: number = 60000
): { success: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0 };
  }

  record.count++;
  return { success: true, remaining: limit - record.count };
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 60000); // Clean every minute

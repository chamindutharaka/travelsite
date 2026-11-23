// In-memory sliding window rate limiter
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const ipMap = new Map<string, RateLimitRecord>();

export function checkRateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 60 * 1000
): { success: boolean; remaining: number } {
  const now = Date.now();
  const record = ipMap.get(ip);

  // Clean expired entries periodically
  if (ipMap.size > 1000) {
    for (const [key, value] of ipMap.entries()) {
      if (value.resetAt < now) {
        ipMap.delete(key);
      }
    }
  }

  if (!record || record.resetAt < now) {
    ipMap.set(ip, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0 };
  }

  record.count += 1;
  return { success: true, remaining: limit - record.count };
}

interface RateLimiter {
  lastRequestTime: number;
  requestCount: number;
  resetTime: number;
}

const RATE_LIMIT = 30; // requests per minute
const RESET_INTERVAL = 60 * 1000; // 1 minute in milliseconds

class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitError';
  }
}

export const rateLimiter: RateLimiter = {
  lastRequestTime: 0,
  requestCount: 0,
  resetTime: Date.now() + RESET_INTERVAL,
};

export const checkRateLimit = () => {
  const now = Date.now();

  // Reset counter if reset time has passed
  if (now > rateLimiter.resetTime) {
    rateLimiter.requestCount = 0;
    rateLimiter.resetTime = now + RESET_INTERVAL;
  }

  // Check if rate limit exceeded
  if (rateLimiter.requestCount >= RATE_LIMIT) {
    const waitTime = Math.ceil((rateLimiter.resetTime - now) / 1000);
    throw new RateLimitError(
      `Rate limit exceeded. Please wait ${waitTime} seconds before trying again.`
    );
  }

  // Update counter
  rateLimiter.requestCount++;
  rateLimiter.lastRequestTime = now;
}; 
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env file
const envResult = dotenvConfig({
  path: resolve(__dirname, '../.env')
});

if (envResult.error) {
  throw new Error('⚠️  Couldn\'t find .env file  ⚠️');
}

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

interface AppConfig {
  port: number;
  nodeEnv: string;
  rateLimit: RateLimitConfig;
  hereApiKey: string;
  hereBaseUrl: string;
  hereDiscoverUrl: string;
  hereRoutingUrl: string;
}

export const config: AppConfig = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes in milliseconds
    maxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
  },
  
  hereApiKey: process.env.HERE_API_KEY ?? '',
  hereBaseUrl: process.env.HERE_BASE_URL || 'https://geocode.search.hereapi.com/v1',
  hereDiscoverUrl: process.env.HERE_DISCOVER_URL || 'https://discover.search.hereapi.com/v1',
  hereRoutingUrl: process.env.HERE_ROUTING_URL || 'https://router.hereapi.com/v8',
};

export const validateConfig = (): void => {
  const missingVars: string[] = [];
  
  // Check if HERE_API_KEY exists in env and has a valid format
  if (!process.env.HERE_API_KEY || process.env.HERE_API_KEY.trim().length === 0) {
    missingVars.push('HERE_API_KEY');
  }
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
};
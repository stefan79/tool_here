import { config, validateConfig } from './config';

// Mock dotenv
jest.mock('dotenv', () => ({
  config: jest.fn().mockReturnValue({ error: null })
}));

describe('Config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Clear all environment variables before each test
    process.env = { ...originalEnv };
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Restore original env after all tests
    process.env = originalEnv;
  });

  describe('config object', () => {
    it('should use default values when environment variables are not set', () => {
      expect(config).toEqual({
        port: 3000,
        nodeEnv: 'test', // Jest sets NODE_ENV to 'test' by default
        rateLimit: {
          windowMs: 900000, // 15 minutes
          maxRequests: 100
        },
        hereApiKey: '',
        hereBaseUrl: 'https://geocode.search.hereapi.com/v1',
        hereDiscoverUrl: 'https://discover.search.hereapi.com/v1',
        hereRoutingUrl: 'https://router.hereapi.com/v8'
      });
    });

    it('should use environment variables when set', () => {
      process.env.PORT = '8080';
      process.env.NODE_ENV = 'production';
      process.env.RATE_LIMIT_WINDOW_MS = '3600000';
      process.env.RATE_LIMIT_MAX_REQUESTS = '1000';
      process.env.HERE_API_KEY = 'test-api-key';
      process.env.HERE_BASE_URL = 'https://test-base-url';
      process.env.HERE_DISCOVER_URL = 'https://test-discover-url';
      process.env.HERE_ROUTING_URL = 'https://test-routing-url';

      // Require config again to get fresh values
      jest.isolateModules(async () => {
        const { config } = await import('./config');
        expect(config).toEqual({
          port: 8080,
          nodeEnv: 'production',
          rateLimit: {
            windowMs: 3600000,
            maxRequests: 1000
          },
          hereApiKey: 'test-api-key',
          hereBaseUrl: 'https://test-base-url',
          hereDiscoverUrl: 'https://test-discover-url',
          hereRoutingUrl: 'https://test-routing-url'
        });
      });
    });
  });

  describe('validateConfig', () => {
    it('should throw error when HERE_API_KEY is missing', () => {
      process.env.HERE_API_KEY = '';
      expect(validateConfig).toThrow('Missing required environment variables: HERE_API_KEY');
    });

    it('should throw error when HERE_API_KEY is only whitespace', () => {
      process.env.HERE_API_KEY = '   ';
      expect(validateConfig).toThrow('Missing required environment variables: HERE_API_KEY');
    });

    it('should not throw error when HERE_API_KEY is valid', () => {
      process.env.HERE_API_KEY = 'valid-api-key';
      expect(validateConfig).not.toThrow();
    });
  });
});

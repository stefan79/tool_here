import { HereClient, geoCode, DiscoverRequest, SearchRequest, discover, queryDiscover } from './here';

describe('here client', () => {
  describe('geoCode', () => {
    it('should map geocode response correctly', async () => {
      // Mock response data
      const mockResponse = {
        data: {
          items: [{
            title: 'Test Location',
            address: {
              label: '123 Test Street, City'
            },
            position: {
              lat: 52.5200,
              lng: 13.4050
            }
          }]
        }
      };

      // Create mock client
      const mockClient: HereClient = jest.fn().mockResolvedValue(mockResponse);

      // Test the geocode function
      const result = await geoCode(mockClient)('test query');

      // Verify client was called with correct parameters
      expect(mockClient).toHaveBeenCalledWith('get', '/geocode', {
        q: 'test query'
      });

      // Verify response mapping
      expect(result).toEqual([{
        title: 'Test Location',
        address: '123 Test Street, City',
        position: {
          lat: 52.5200,
          lng: 13.4050
        }
      }]);
    });

    it('should handle empty response', async () => {
      // Mock empty response
      const mockResponse = {
        data: {
          items: []
        }
      };

      const mockClient: HereClient = jest.fn().mockResolvedValue(mockResponse);
      const result = await geoCode(mockClient)('nonexistent location');

      expect(result).toEqual([]);
    });

    it('should handle API errors', async () => {
      const mockClient: HereClient = jest.fn().mockRejectedValue(new Error('API Error'));

      await expect(geoCode(mockClient)('test query'))
        .rejects
        .toThrow('API Error');
    });

    it('should handle malformed response', async () => {
      const mockResponse = {
        data: {
          // Missing items array
        }
      };

      const mockClient: HereClient = jest.fn().mockResolvedValue(mockResponse);
      
      await expect(geoCode(mockClient)('test query'))
        .rejects
        .toThrow('No items in response');
    });
  });

  describe('discover', () => {
    it('should map discover response correctly', async () => {
      const mockResponse = {
        data: {
          items: [{
            title: 'Restaurant',
            address: {
              label: '456 Food Street, City'
            },
            position: {
              lat: 52.5200,
              lng: 13.4050
            }
          }]
        }
      };

      const mockClient: HereClient = jest.fn().mockResolvedValue(mockResponse);

      const searchRequest: SearchRequest = {
        query: 'restaurants',
        at: '52.52,13.405'
      };

      const result = await discover(mockClient)(searchRequest);

      expect(mockClient).toHaveBeenCalledWith('get', '/discover', {
        q: 'restaurants',
        at: '52.52,13.405'
      });

      expect(result).toEqual([{
        title: 'Restaurant',
        address: '456 Food Street, City',
        position: {
          lat: 52.5200,
          lng: 13.4050
        }
      }]);
    });

    it('should handle empty discover response', async () => {
      const mockResponse = {
        data: {
          items: []
        }
      };

      const mockClient: HereClient = jest.fn().mockResolvedValue(mockResponse);
      const result = await discover(mockClient)({ query: 'nonexistent', at: '52.5200,13.4050' });

      expect(result).toEqual([]);
    });

    it('should handle discover API errors', async () => {
      const mockClient: HereClient = jest.fn().mockRejectedValue(new Error('API Error'));

      await expect(discover(mockClient)({ query: 'test', at: '52.5200,13.4050' }))
        .rejects
        .toThrow('API Error');
    });
  });

  describe('queryDiscover', () => {
    it('should chain geocode and discover correctly', async () => {
      // Mock geocode response
      const mockGeoCodeResponse = {
        data: {
          items: [{
            title: 'City Center',
            address: {
              label: '789 Main St, City'
            },
            position: {
              lat: 52.5200,
              lng: 13.4050
            }
          }]
        }
      };

      // Mock discover response
      const mockDiscoverResponse = {
        data: {
          items: [{
            title: 'Nice Restaurant',
            address: {
              label: '123 Food Ave, City'
            },
            position: {
              lat: 52.5201,
              lng: 13.4051
            }
          }]
        }
      };

      const mockClient: HereClient = jest.fn()
        .mockResolvedValueOnce(mockGeoCodeResponse)
        .mockResolvedValueOnce(mockDiscoverResponse);

      const request: DiscoverRequest = {
        query: 'restaurants',
        location: 'city center'
      };

      const result = await queryDiscover(mockClient)(request);

      // Verify geocode call
      expect(mockClient).toHaveBeenNthCalledWith(1, 'get', '/geocode', {
        q: 'city center'
      });

      // Verify discover call
      expect(mockClient).toHaveBeenNthCalledWith(2, 'get', '/discover', {
        q: 'restaurants',
        at: '52.52,13.405'
      });

      expect(result).toEqual([{
        title: 'Nice Restaurant',
        address: '123 Food Ave, City',
        position: {
          lat: 52.5201,
          lng: 13.4051
        }
      }]);
    });

    it('should handle errors in geocode step', async () => {
      const mockClient: HereClient = jest.fn().mockRejectedValue(new Error('Geocode Error'));

      const request: DiscoverRequest = {
        query: 'restaurants',
        location: 'invalid location'
      };

      await expect(queryDiscover(mockClient)(request))
        .rejects
        .toThrow('Geocode Error');
    });

    it('should handle errors in discover step', async () => {
      // Mock successful geocode but failed discover
      const mockGeoCodeResponse = {
        data: {
          items: [{
            title: 'City Center',
            address: {
              label: '789 Main St, City'
            },
            position: {
              lat: 52.5200,
              lng: 13.4050
            }
          }]
        }
      };

      const mockClient: HereClient = jest.fn()
        .mockResolvedValueOnce(mockGeoCodeResponse)
        .mockRejectedValueOnce(new Error('Discover Error'));

      const request: DiscoverRequest = {
        query: 'restaurants',
        location: 'city center'
      };

      await expect(queryDiscover(mockClient)(request))
        .rejects
        .toThrow('Discover Error');
    });
  });
});

import { GeoCodeItem } from './clients/here';
import { mapToolResponse } from './mcp';

describe('mapToolResponse', () => {
  it('should map GeoCodeItem array to the expected response format', () => {
    const mockData: GeoCodeItem[] = [
      {
        title: 'Location 1',
        address: '123 Main St',
        position: { lat: 0, lng: 0 }
      },
      {
        title: 'Location 2',
        address: '456 Oak Ave',
        position: { lat: 1, lng: 1 }
      }
    ];

    const result = mapToolResponse(mockData);

    expect(result).toEqual({
      content: [
        {
          type: 'text',
          text: 'Location 1: 123 Main St'
        },
        {
          type: 'text',
          text: 'Location 2: 456 Oak Ave'
        }
      ]
    });
  });

  it('should handle empty input array', () => {
    const result = mapToolResponse([]);

    expect(result).toEqual({
      content: []
    });
  });
});

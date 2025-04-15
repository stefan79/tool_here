const request = require('supertest');
const app = require('../../index'); // Adjust the path if necessary

describe('Geocode API', () => {
  it('should return geocode data for a valid query', async () => {
    const response = await request(app)
      .get('/geocode')
      .query({ query: '1600 Amphitheatre Parkway, Mountain View, CA' });


    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    const item = response.body[0];
    expect(item).toHaveProperty('title');
    expect(item).toHaveProperty('address');
    expect(item).toHaveProperty('position');
  });

  it('should return an error for an invalid query', async () => {
    const response = await request(app)
      .get('/geocode')
      .query({ query: '' });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error');
  });
});
 
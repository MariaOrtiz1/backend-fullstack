import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('champion routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
    
  it('creates a champion via POST', async () => {
    const lux = { 
      name: 'Luxanna Crownguard',
      title: 'The Lady of Luminosity',
      quote: 'The light inside is what makes me different, and I’m always careful where I shine it.',
      region: 'Demacia', 
      role: 'mage' };
    const res = await request(app)
      .post('/api/v1/champions')
      .send(lux);
    
    expect(res.body).toEqual({
      id: '1',
      ...lux
    });
  });
});


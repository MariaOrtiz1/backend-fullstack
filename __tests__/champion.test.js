import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Champion from '../lib/Model/Champion.js';

describe('champion routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a champion via POST', async () => {
    const lux = { 
      name: 'Luxanna Crownguard',
      title: 'The Lady of Luminosity',
      quote: 'The light inside is what makes me different, and I am always careful where I shine it.',
      region: 'Demacia', 
      position: 'mage' };
    const res = await request(app)
      .post('/api/v1/champions')
      .send(lux);
    
    expect(res.body).toEqual({
      id: '1',
      ...lux
    });
  });

  it('gets a champion by id via GET', async () => {
    const Ahri = await Champion.insert({ 
      name: 'Ahri',
      title: 'The Nine-Tailed Fox',
      quote: 'Human emotions can be more volatile than even the deepest magic.',
      region: 'Ionia', 
      position: 'mage'
    });

    const res = await request(app).get(`/api/v1/champions/${Ahri.id}`);

    expect(res.body).toEqual(Ahri);
  });
});

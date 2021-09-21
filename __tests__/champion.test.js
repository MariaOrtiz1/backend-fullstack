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

  it('gets all champions via GET', async () => {
    const Aphelios = await Champion.insert({ 
      name: 'Aphelios',
      title: 'The Weapon Of The Faithful',
      quote: 'Our faith is proven fate each time we deny it.',
      region: 'Targon', 
      position: 'marksman'
    });

    const Gragas = await Champion.insert({ 
      name: 'Gragas',
      title: 'The Rabble Rouser',
      quote: 'Now this will put hair on your chest!',
      region: 'Freljord', 
      position: 'fighter'
    });

    const Pantheon = await Champion.insert({ 
      name: 'Atreus',
      title: 'The Unbreakable Spear',
      quote: 'Here is my eternity… a day the gods will remember!',
      region: 'Targon', 
      position: 'fighter'
    });

    const res = await request(app)
      .get('/api/v1/champions');

    expect(res.body).toEqual([Aphelios, Gragas, Pantheon]);
  });

  it('updates a champion by id via PUT', async () => {
    const Kayle = await Champion.insert({ 
      name: 'Kayle',
      title: 'The Righteous',
      quote: 'No human is perfect. But I am not human',
      region: 'Targon', 
      position: 'fighter'
    });

    const res = await request(app)
      .put(`/api/v1/champions/${Kayle.id}`)
      .send({ region: 'Demacia' });

    expect(res.body).toEqual({ ...Kayle, region: 'Demacia' });
    
  });

  it('deletes an existing champion by id via DELETE', async () => {
    const Gankplank = await Champion.insert({
      name: 'Gankplank',
      title: 'The Saltwater Scourge',
      quote: 'I was cutting throats and sinking Noxian war galleys when you were still pissing your britches, boy. You don’t want to take me on.',
      region: 'Bilgewater', 
      position: 'fighter'
    });

    const res = await request(app)
      .delete(`/api/v1/champions/${Gankplank.id}`);

    expect(res.body).toEqual({ 
      message: `${Gankplank.name} has been deleted`
    });
  });
});

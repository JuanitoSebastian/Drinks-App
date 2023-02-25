import supertest from 'supertest';
import { exportForTesting as drinksExportForTesting } from '../services/drinks';
import app from '../app';
import { testDrinks, validTestDrinkToCreate, invalidTestDrinkToCreate } from './helper';

const api = supertest(app);

describe('Drinks endpoint', () => {

  beforeEach(() => {
    drinksExportForTesting.setDrinks(testDrinks);
  });

  afterEach(() => {
    drinksExportForTesting.clearAllDrinks();
  });

  test('All drinks are returned', async () => {
    const response = await api.get('/drinks');
    expect(response.body.data).toEqual(testDrinks);
  });

  test('Filter by search returns matches', async () => {
    const searchString = 'lucaffe';
    const response = await api.get(`/drinks?search=${searchString}`);
    expect(response.body.data).toHaveLength(2);
    expect(response.body.data[0].name).toEqual('Lucaffe Mamma Lucia');
    expect(response.body.data[1].name).toEqual('Lucaffe Decaffeinato');
  });

  test('Filter by search returns [] when no matches', async () => {
    const searchString = 'kaffa';
    const response = await api.get(`/drinks?search=${searchString}`);
    expect(response.body.data).toHaveLength(0);
  });

  test('Valid drink is created', async () => {
    const response = await api
      .post('/drinks')
      .send(validTestDrinkToCreate)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.data).toBeDefined();
    expect(response.body.data.name).toEqual(validTestDrinkToCreate.name);
    expect(response.body.data.type).toEqual(validTestDrinkToCreate.type);
    expect(response.body.data.roast).toEqual(validTestDrinkToCreate.roast);
    expect(response.body.data.price).toEqual(validTestDrinkToCreate.price);
  });

  test('Invalid drink returns status 400', async () => {
    const response = await api
      .post('/drinks')
      .send(invalidTestDrinkToCreate)
      .expect(400)
      .expect('Content-Type', /application\/json/);

      expect(response.body.error).toBeDefined();
  });

  describe('Coffees endpoint', () => {
    test('Only coffees are returned', async () => {
      const response = await api.get('/drinks/coffees');
      expect(response.body.data).toEqual(testDrinks.filter(drink => drink.type === 'coffee'));
    });

    test('Filter by search returns only coffee', async () => {
      const searchStringCoffee = 'lucaffe';
      let response = await api.get(`/drinks/coffees?search=${searchStringCoffee}`);
      expect(response.body.data).toHaveLength(2);
      const searchStringTea = 'herukka';
      response = await api.get(`/drinks/coffees?search=${searchStringTea}`);
      expect(response.body.data).toHaveLength(0);
    });
  });

  describe('Teas endpoint', () => {
    test('Only teas are returned', async () => {
      const response = await api.get('/drinks/teas');
      expect(response.body.data).toEqual(testDrinks.filter(drink => drink.type === 'tea'));
    });

    test('Filter by search returns only tea', async () => {
      const searchStringTea = 'herukka';
      let response = await api.get(`/drinks/teas?search=${searchStringTea}`);
      expect(response.body.data).toHaveLength(1);

      const searchStringCoffee = 'lucaffe';
      response = await api.get(`/drinks/teas?search=${searchStringCoffee}`);
      expect(response.body.data).toHaveLength(0);
    });
  });
});
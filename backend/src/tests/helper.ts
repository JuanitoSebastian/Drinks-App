import { Drink } from '../types/Drink';
import { v1 as uuid } from 'uuid';

export const testDrinks: Drink[] = [
  {
    id: uuid(),
    type: 'coffee',
    name: 'Lucaffe Mamma Lucia',
    price: 22.9,
    roast: 4
  },
  {
    id: uuid(),
    type: 'coffee',
    name: 'Lucaffe Decaffeinato',
    price: 29.9,
    roast: 4
  },
  {
    id: uuid(),
    name: 'Ethiopia Sidamo',
    type: 'coffee',
    price: 8.9,
    roast: 2
  },
  {
    id: uuid(),
    name: 'Mustaherukkakevät',
    type: 'tea',
    price: 3.5,
    roast: 1
  },
  {
    id: uuid(),
    name: 'Mate Cancheada',
    type: 'tea',
    price: 3,
    roast: 2
  }
];

export const validTestDrinkToCreate = {
  name: 'Lykke Espresso BAM BAM',
  type: 'coffee',
  price: 6.9,
  roast: 5
};

export const invalidTestDrinkToCreate = {
  name: 'Coca Cola',
  type: 'soda',
  price: 2.7,
  roast: 1
};
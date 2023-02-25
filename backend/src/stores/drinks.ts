import { Drink } from '../types/Drink';

/**
 * Returns all Drink objects saved in the store
 * @returns An array of Drink objects
 */
const getAll = (): Drink[] => {
  return [];
};

/**
 * Saves all given Drink objects to store. Overwrites
 * the previous store.
 * @param drinks 
 */
const setAll = (drinks: Drink[]) => {
  console.log('Saving all Drinks to the store');
  console.log(drinks);
};

export default {
  getAll,
  setAll
};
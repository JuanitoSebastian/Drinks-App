import { Drink, DrinkType, NewDrink } from '../types/Drink';
import { v1 as uuid } from 'uuid';

const drinks: Drink[] = [];

/**
 * Returns saved drinks. Optional filtering by type and name of drink.
 * @param type Filter drinks by their type: coffee / tea. (optional)
 * @param nameToFilterBy Filter drinks by their name. (optional)
 * @returns An array of Drinks
 */
const getMany = (type: DrinkType|undefined = undefined, nameToFilterBy: string|undefined = undefined): Drink[] => {
  return drinks
    .filter(drink => filterByType(drink, type))
    .filter(drink => filterByName(drink, nameToFilterBy));
};

/**
 * Determines if a Drink is of a given type. Returns true if type 
 * is undefined.
 */
const filterByType = (drink: Drink, type: DrinkType|undefined): boolean => {
  return type ?
    drink.type === type :
    true;
};

/**
 * Determines if a Drink name contains part of given string. Returns true 
 * if nameToFilterBy is undefined.
 */
const filterByName = (drink: Drink, nameToFilterBy: string|undefined): boolean => {
  if (!nameToFilterBy) { 
    return true; 
  }

  const searchString = nameToFilterBy.trim().toLowerCase();
  return drink.name.toLowerCase().includes(searchString);
};

/**
 * Creates a new drink and returns new Drink object
 * @param drinkToCreate 
 * @returns Drink
 */
const createDrink = (drinkToCreate: NewDrink): Drink => {
  const drinkToReturn: Drink = {
    id: uuid(),
    ...drinkToCreate
  };

  drinks.push(drinkToReturn);

  return drinkToReturn;

};

export default {
  getMany,
  createDrink
};
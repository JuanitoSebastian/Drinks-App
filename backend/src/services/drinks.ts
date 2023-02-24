import { Drink, DrinkType, NewDrink } from '../types/Drink';

const drinks: Drink[] = [];

/**
 * Returns all saved drinks
 * @param type Filter drinks by a given type
 * @returns An array of Drinks
 */
const getMany = (type: DrinkType|undefined = undefined): Drink[] => {
  if (type) {
    return drinks.filter(drink => drink.type === type);
  }

  return drinks;
};

/**
 * Returns all drinks filtered by a given name
 * @param type Filter drinks by a given type
 * @param name String that has to be included in name
 * @returns An array of Drinks
 */
const getManyByName = (type: DrinkType|undefined = undefined, name: string): Drink[] => {
  const searchString = name.trim().toLowerCase();

  if (type) {
    const filteredByType = drinks.filter(drink => drink.type === type);
    return filteredByType.filter(drink => drink.name.toLocaleLowerCase().includes(searchString));
  }

  return drinks.filter(drink => drink.name.toLocaleLowerCase().includes(searchString));
};


/**
 * Creates a new drink and returns new Drink object
 * @param drinkToCreate 
 * @returns Drink
 */
const createDrink = (drinkToCreate: NewDrink): Drink => {
  if (drinks.length === 0) {
    const drinkToReturn: Drink = {
      id: 0, 
      ...drinkToCreate
    };
    return drinkToReturn;
  }

  const latestDrink = drinks[drinks.length - 1];
  const drinkToReturn: Drink = {
    id: latestDrink.id + 1,
    ...drinkToCreate
  };

  return drinkToReturn;

};

export default {
  getMany,
  getManyByName,
  createDrink
};
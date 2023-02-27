import { Drink, DrinkFromCsv } from '../types/Drink';
import SanitizedConfig from '../utils/config';
import { DIRECTORY_PERSIST_CSV, DRINKS_CSV_FILENAME } from '../utils/constants';
import CsvHelper from '../utils/csv';
import { parseDrinkFromCsv, parseDrinkFromDrinkFromCsv, parseStringArray, parseUnkownArray } from '../utils/validation';

const csvFilename = `${DRINKS_CSV_FILENAME}.${SanitizedConfig.NODE_ENV}.csv`;

/**
 * Returns all Drink objects saved in the store
 * @returns
 *    - On success: An array of Drink objects
 *    - On error: An empty array
 */
const getAll = async (): Promise<Drink[]> => {
  try {
    const dataRaw = await CsvHelper.readCsvFile(DIRECTORY_PERSIST_CSV, csvFilename);

    if (dataRaw.length === 0) {
      return [];
    }
    const objectKeys = parseStringArray(dataRaw.shift());
    const drinks = dataRaw.map(row => csvRowToDrinkObject(row, objectKeys));

    return drinks;
  } catch (error) {
    console.log('Failed to load Drinks from .csv file');
    console.log(error);
    return [];
  }
};

/**
 * Converts a row returned by CsvHelper to a Drink object
 * @param row An unkown[]
 * @param objectKeys Drink object keys
 * @throws On validation errors from parsing
 * @returns Drink object
 */
const csvRowToDrinkObject = (row: unknown, objectKeys: string[]): Drink => {
  const rawDrinkArray = parseUnkownArray(row);
  const rawDrinksEntries = rawDrinkArray.map((element, index) => {
    return [objectKeys[index], element];
  });
  const rawDrink: unknown = Object.fromEntries(rawDrinksEntries);
  const drinkFromCsv: DrinkFromCsv = parseDrinkFromCsv(rawDrink);
  return parseDrinkFromDrinkFromCsv(drinkFromCsv);
};

/**
 * Saves all given Drink objects to store. Overwrites
 * the previous store.
 * @param drinks 
 */
const setAll = (drinks: Drink[]) => {
  if (drinks.length === 0) {
    return;
  }

  try {
    const header = ['id', 'type', 'name', 'price', 'weight', 'roast'];
    const data: unknown[] = drinks.map(drink => drinkToArray(drink));
    CsvHelper.writeCsvFile(DIRECTORY_PERSIST_CSV, csvFilename, header, data);
  } catch (error) {
    console.log('Failed to save Drinks to .csv file');
    console.log(error);
  }
};

/**
 * Clears the store
 */
const clearAll = () => {
  try {
    CsvHelper.clearCsvFile(DIRECTORY_PERSIST_CSV, csvFilename);
  } catch (error) {
    console.log('Failed to clear .csv file');
    console.log(error);
  }
};

/**
 * Converts Drink object to an array
 */
const drinkToArray = (drink: Drink): unknown[] => {
  return [drink.id, drink.type, drink.name, drink.price, drink.weight, drink.roast];
};

export default {
  getAll,
  setAll,
  clearAll
};
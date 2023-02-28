import axios, { AxiosResponse } from 'axios';
import { Drink, NewDrink } from '../types/Drink';
import SanitizedConfig from '../utils/config';
import { parseApiResponse, parseDrink, parseDrinkArray } from '../utils/validation';

const drinkApiUrl = `${SanitizedConfig.API_URL}/drinks`;

/**
 * Gets drinks from API
 * @throws Axios and ValidationErrors
 */
const getDrinks = async (): Promise<Drink[]> => {
  const rawApiResponse: AxiosResponse<unknown, unknown> = await axios.get(drinkApiUrl);
  const apiResponse = parseApiResponse(rawApiResponse.data);
  const sanitizedDrinks = parseDrinkArray(apiResponse.data);
  return sanitizedDrinks;
};

/**
 * Posts a new drink to API and returns the created drink
 * @param drinkToCreate NewDrink object to create
 * @throws Axios and ValidationErrors
 * @returns On success new Drink
 */
const createDrink = async (drinkToCreate: NewDrink): Promise<Drink> => {
  const rawApiResponse: AxiosResponse<unknown, unknown> = await axios.post(drinkApiUrl, drinkToCreate);
  const apiRepsonse = parseApiResponse(rawApiResponse.data);
  const drink = parseDrink(apiRepsonse.data);
  return drink;
};


export default {
  getDrinks,
  createDrink
};
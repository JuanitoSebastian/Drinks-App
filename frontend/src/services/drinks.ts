import axios, { AxiosResponse } from 'axios';
import { Drink } from '../types/Drink';
import SanitizedConfig from '../utils/config';
import { parseApiResponse, parseDrinkArray } from '../utils/validation';

const drinkApiUrl = `${SanitizedConfig.API_URL}/drinks`;

/**
 * Gets drinks from API
 */
const getDrinks = async (): Promise<Drink[]> => {
  const rawApiResponse: AxiosResponse<unknown, unknown> = await axios.get(drinkApiUrl);
  const apiResponse = parseApiResponse(rawApiResponse.data);
  const sanitizedDrinks = parseDrinkArray(apiResponse.data);
  return sanitizedDrinks;
};


export default {
  getDrinks
};
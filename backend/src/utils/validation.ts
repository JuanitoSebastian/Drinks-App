import { DrinkType, NewDrink, Roast } from '../types/Drink';
import ValidationError from '../errors/ValidationError';

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new ValidationError('Incorrect type, not string');
  }

  return text;
};

export const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

export const parseNumber = (numberToParse: unknown): number => {
  if (!numberToParse || !isNumber(numberToParse)) {
    throw new ValidationError('Incorrect type, not a number');
  }

  return numberToParse;
};

const isDrinkType = (drinkType: unknown): drinkType is DrinkType => {
  return isString(drinkType) && (drinkType === 'coffee' || drinkType === 'tea');
};

export const parseDrinkType = (drinkType: unknown): DrinkType => {
  if (!isDrinkType(drinkType)) {
    throw new ValidationError('Incorrect type, not a DrinkType');
  }

  return drinkType;
};

const isRoast = (roast: unknown): roast is Roast => {
  return isNumber(roast) && roast > 0 && roast < 6;
};

export const parseRoast = (roast: unknown): Roast => {
  if (!isRoast(roast)) {
    throw new ValidationError('Incorrect type, not a Roast');
  }

  return roast;
};

const isNewDrink = (newDrink: unknown): newDrink is NewDrink => {
  return newDrink !== null && typeof newDrink === 'object' &&
  'type' in newDrink && isDrinkType(newDrink.type) &&
  'name' in newDrink && isString(newDrink.name) &&
  'price' in newDrink && isNumber(newDrink.price) &&
  'roast' in newDrink && isRoast(newDrink.roast) &&
  'weight' in newDrink && isNumber(newDrink.weight);
};

export const parseNewDrink = (newDrink: unknown): NewDrink => {
  if (!newDrink || !isNewDrink(newDrink)) {
    throw new ValidationError('Incorrect type, not a NewDrink');
  }

  return newDrink;
};
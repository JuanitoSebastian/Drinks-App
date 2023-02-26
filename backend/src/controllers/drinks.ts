import express, { NextFunction, Request, Response } from 'express';
import DrinksService from '../services/drinks';
import { parseDrinkType, parseNewDrink } from '../utils/validation';

const router = express.Router();

router.get('/', (request: Request, response: Response) => {
  const typeOfDrinkString = request.query.type?.toString();
  const searchQuery = request.query.search?.toString();

  try {
    const typeOfDrink = parseDrinkType(typeOfDrinkString);
    const drinks = DrinksService.getMany(typeOfDrink, searchQuery);
    response.json({ data: drinks });
  } catch {
    const drinks = DrinksService.getMany(undefined, searchQuery);
    response.json({ data: drinks });
  }
});

router.post('/', (request: Request, response: Response, next: NextFunction) => {
  try {
    const newDrink = parseNewDrink(request.body);
    const drinkToReturn = DrinksService.createDrink(newDrink);

    response.status(201).json({ data: drinkToReturn });
  } catch (error) {
    next(error);
  }
});

export default router;
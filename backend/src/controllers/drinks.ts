import express, { NextFunction, Request, Response } from 'express';
import DrinksService from '../services/drinks';
import { parseNewDrink } from '../utils/validation';

const router = express.Router();

router.get('/', (_request: Request, response: Response) => {
  const drinks = DrinksService.getMany();
  response.json({ data: drinks });
});

router.post('/', (request: Request, response: Response, next: NextFunction) => {
  try {
    const newDrink = parseNewDrink(request.body);
    const drinkToReturn = DrinksService.createDrink(newDrink);

    response.json({ data: drinkToReturn });
  } catch (error) {
    next(error);
  }
});

router.get('/coffees', (_request: Request, response: Response) => {
  const drinks = DrinksService.getMany('coffee');
  response.json({ data: drinks });
});

router.get('/teas', (_request: Request, response: Response) => {
  const drinks = DrinksService.getMany('tea');
  response.json({ data: drinks });
});


export default router;
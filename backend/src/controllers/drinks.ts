import express, { NextFunction, Request, Response } from 'express';
import DrinksService from '../services/drinks';
import { parseNewDrink } from '../utils/validation';

const router = express.Router();

router.get('/', (request: Request, response: Response) => {
  const searchQuery = request.query.search?.toString();

  if (searchQuery) {
    const drinks = DrinksService.getMany(undefined, searchQuery);
    response.json({ data: drinks });
    return;
  }

  const drinks = DrinksService.getMany();
  response.json({ data: drinks });
});


router.get('/coffees', (request: Request, response: Response) => {
  const searchQuery = request.query.search?.toString();

  if (searchQuery) {
    const drinks = DrinksService.getMany('coffee', searchQuery);
    response.json({ data: drinks });
    return;
  }

  const drinks = DrinksService.getMany('coffee');
  response.json({ data: drinks });
});

router.get('/teas', (request: Request, response: Response) => {
  const searchQuery = request.query.search?.toString();

  if (searchQuery) {
    const drinks = DrinksService.getMany('tea', searchQuery);
    response.json({ data: drinks });
    return;
  }

  const drinks = DrinksService.getMany('tea');
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

export default router;
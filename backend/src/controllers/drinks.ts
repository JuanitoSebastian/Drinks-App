import express, { Request, Response } from 'express';
import DrinksService from '../services/drinks';

const router = express.Router();

router.get('/', (_request: Request, response: Response) => {
  const drinks = DrinksService.getMany();
  response.json({ data: drinks });
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
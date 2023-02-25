import express from 'express';
import DrinksRouter from './controllers/drinks';
import middlewares from './utils/middlewares';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/drinks', DrinksRouter);

app.use(middlewares.unknownEndPoint);
app.use(middlewares.errorHandler);

export default app;
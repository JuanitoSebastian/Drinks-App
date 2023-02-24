import express from 'express';
import DrinksRouter from './controllers/drinks';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/drinks', DrinksRouter);

export default app;
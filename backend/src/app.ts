import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/ping', (_request: Request, response: Response) => {
  response.send('pong');
});

export default app;
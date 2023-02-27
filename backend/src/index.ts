import http from 'http';
import app from './app';
import SanitizedConfig from './utils/config';
import DrinksService from './services/drinks';

const server = http.createServer(app);

const start = async () => {
  await DrinksService.loadDrinksFromStore();
  server.listen(SanitizedConfig.PORT, () => {
    console.log(`Server running on port ${SanitizedConfig.PORT}`);
  });
};

void start();
import http from 'http';
import app from './app';
import SanitizedConfig from './utils/config';

const server = http.createServer(app);

const start = () => {
  server.listen(SanitizedConfig.PORT, () => {
    console.log(`Server running on port ${SanitizedConfig.PORT}`);
  });
};

start();
import http from 'http';
import express, { Express } from 'express';

import reserveTicketRoutes from './routes/seats';

const router: Express = express();

const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 3000;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

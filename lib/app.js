import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import championsController from './controllers/champions.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/champions', championsController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;

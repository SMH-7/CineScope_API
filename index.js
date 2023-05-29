import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './src/movies';
// import genresRouter from './src/genres';
import createGenresRouter from './src/genres/routes';
import createAccountsRouter from './src/accounts/routes';
import buildDependencies from "./src/config/dependencies";
import createMoviesRouter from './src/movies/routes';
import createReviewRouter from './src/reviews/routes';
import db from './src/config/db';
import errorHandler from './src/utils/ErrorHandler';

import { setupSwagger } from './swagger';

dotenv.config();
db.init(); 

const dependencies = buildDependencies();
const app = express();

const port = process.env.PORT;

setupSwagger(app);

app.use(express.json());
// app.use('/api/movies', moviesRouter);

/**
 * @swagger
 * tags:
 *   name: Genres
 *   description: API endpoints for genres
 */
app.use('/api/genres', createGenresRouter(dependencies));

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: API endpoints for accounts
 */
app.use('/api/accounts', createAccountsRouter(dependencies));

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: API endpoints for movies
 */
app.use('/api/movies', createMoviesRouter(dependencies));


/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API endpoints for movie reviews
 */
app.use('/api/reviews', createReviewRouter(dependencies));

app.use(errorHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});

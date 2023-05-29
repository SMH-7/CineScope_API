import express from 'express';
import MoviesController from '../controllers';

const createMoviesRouter = (dependencies) => {
    const router = express.Router();
    // load controllers with dependencies
    const moviesController = MoviesController(dependencies);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the movie
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movie found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 imagePath:
 *                   type: string
 */
    router.route('/:id')
        .get(moviesController.getMovie);

 /**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get a list of movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: List of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   imagePath:
 *                     type: string
 */       
    router.route('/')
        .get(moviesController.find);


/**
 * @swagger
 * /api/movies/upcoming:
 *   get:
 *     summary: Get upcoming movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: List of upcoming movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier of the movie
 *                   name:
 *                     type: string
 *                     description: The name of the movie
 *                   imagePath:
 *                     type: string
 *                     description: The path to the movie's image
 */
    router.route('/upcoming')
        .get(moviesController.getUpcomingMovies);
        

/**
 * @swagger
 * /api/movies/image/{id}:
 *   get:
 *     summary: Get movie thumbnail image
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The movie thumbnail image
 *         content:
 *           image:
 *             schema:
 *               type: string
 *               format: string
 */
    router.route('/image/:id')
        .get(moviesController.getMovieThumbnail);

    return router;
};
export default createMoviesRouter;

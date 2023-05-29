import express from 'express';
import genresController from  '../controller'

const createGenresRouter = (dependencies) => {
    const router = express.Router();
    // load controllers with dependencies
    const controller = genresController(dependencies);


/**
 * @swagger
 * /api/genres:
 *   get:
 *     summary: Get all movie genres
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: List of movie genres
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
 *
 */
    router.route('/')
        .get(controller.getMovieGenres);

    // router.route('/:id')
    //     .get(controller.getMovieGenresName);

    return router;
};
export default createGenresRouter;
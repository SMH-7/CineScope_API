import express from 'express';
import servicesController from '../controller'


const createReviewRouter = (dependencies) => {
    const router = express.Router();
    // load controllers with dependencies
    const controller = servicesController(dependencies);



/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Get movie reviews by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the movie
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of movie reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Author:
 *                     type: string
 *                   Excerpt:
 *                     type: string
 */
    router.route('/:id')
        .get(controller.getMovieReviews);

    return router;
};
export default createReviewRouter;
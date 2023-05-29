import express from 'express';
import ValidationController from '../controllers/ValidationController';
import AccountsController from '../controllers';


const createRouter = (dependencies) => {
  const router = express.Router();

  // Load controller with dependencies
  const accountsController = AccountsController(dependencies);
  const validationController = ValidationController(dependencies);

  // Define routes


  /**
   * @swagger
   * /api/accounts:
   *   post:
   *     summary: Create a new account
   *     tags: [Accounts]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *               favourites:
   *                 type: array
   *                 items:
   *                   type: number
   *               watchList:
   *                 type: array
   *                 items:
   *                   type: number
   *             example:
   *               email: example@example.com
   *               password: password123
   *     responses:
   *       201:
   *         description: Account created successfully
   */
  router.route('/')
    .post(validationController.validateAccount, accountsController.createAccount)
    .get(accountsController.listAccounts);

  router.route('/:id')
    .get(accountsController.getAccount)
    .post(accountsController.updateAccount);


  /**
* @swagger
* /api/accounts/email/{id}:
*   get:
*     summary: Get account by ID
*     tags: [Accounts]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: number
*         description: Account ID
*     responses:
*       200:
*         description: Success
*/
  router.route('/email/:id')
    .get(accountsController.getAccountId);


  /**
* @swagger
* /api/accounts/security/token:
*   post:
*     summary: Authenticate account and generate token
*     tags: [Accounts]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*               password:
*                 type: string
*             example:
*               email: example@example.com
*               password: password123
*     responses:
*       200:
*         description: Authentication successful
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 token:
*                   type: string
*             example:
*               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAZXhhbXBsZS5jb20iLCJpYXQiOjE2MzUwNjYyNzZ9.4uLqVKveqkW-mOhuSnZIzGFIiMzxqUyZWiXWS_Tz88c
*       401:
*         description: Invalid credentials
*/
  router.route('/security/token')
    .post(accountsController.authenticateAccount);

  /**
 * @swagger
 * /api/accounts/{id}/favourites:
 *   post:
 *     summary: Add a movie to favourites
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Account ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: number
 *             example:
 *               movieId: abc123
 *     responses:
 *       200:
 *         description: Movie added to favourites successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       500:
 *         description: Internal Server Error
 *
 *   get:
 *     summary: Get favourites of an account
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Favourites retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: number
 *                 example: abc123
 *       401:
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Delete a movie from favourites
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Account ID
 *       - in: query
 *         name: movieId
 *         required: true
 *         schema:
 *           type: number
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie removed from favourites successfully
 */
  router.route('/:id/favourites')
    .post(accountsController.addFavourite)
    .get(accountsController.getFavourites)
    .delete(accountsController.deleteFavourite);

  /**
* @swagger
* /api/accounts/{id}/watchlist:
*   post:
*     summary: Add a movie to watchlist
*     tags: [Accounts]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: number
*         description: Account ID
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               movieId:
*                 type: number
*             example:
*               movieId: abc123
*     responses:
*       200:
*         description: Movie added to watchlist successfully
*       500:
*         description: Internal Server Error
*
*   get:
*     summary: Get watchlist of an account
*     tags: [Accounts]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: number
*         description: Account ID
*     responses:
*       200:
*         description: Watchlist retrieved successfully
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: number
*                 example: abc123
*       401:
*         description: Unauthorized
*
*   delete:
*     summary: Delete a movie from watchlist
*     tags: [Accounts]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: number
*         description: Account ID
*       - in: query
*         name: movieId
*         required: true
*         schema:
*           type: number
*         description: Movie ID
*     responses:
*       200:
*         description: Movie removed from watchlist successfully
*/
  router.route('/:id/watchlist')
    .post(accountsController.addWatchlist)
    .get(accountsController.getWatchlist)
    .delete(accountsController.deleteWatchlist);

  return router;
};

export default createRouter;
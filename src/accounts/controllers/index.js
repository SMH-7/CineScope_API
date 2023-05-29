import accountService from "../services";

export default (dependencies) => {

    const createAccount = async (request, response, next) => {
        // Input
        const { email, password } = request.body;
        // Treatment
        const account = await accountService.registerAccount(email, password, dependencies);
        //output
        response.status(201).json(account)
    };

    const updateAccount = async (request, response, next) => {
        // Input
        const accountId = request.params.id;
        const { email, password } = request.body;
        // Treatment
        const account = await accountService.updateAccount(accountId, email, password, dependencies);
        //Output
        response.status(200).json(account)
    };

    const getAccount = async (request, response, next) => {
        //input
        const accountId = request.params.id;
        // Treatment
        const account = await accountService.getAccount(accountId, dependencies);
        //output
        response.status(200).json(account);
    };
    const getAccountId = async (request, response, next) => {
        //input
        const email = request.params.id;
        // Treatment
        const account = await accountService.findByEmail(email, dependencies);
        //output
        response.status(200).json(account.id);
    };
    const listAccounts = async (request, response, next) => {
        // Treatment
        const accounts = await accountService.find(dependencies);
        //output
        response.status(200).json(accounts);
    };

    const authenticateAccount = async (request, response, next) => {
        try {
            const { email, password } = request.body;
            const token = await accountService.authenticate(email, password, dependencies);
            response.status(200).json({ token: `BEARER ${token}` });
        } catch (error) {
            response.status(401).json({ message: 'Unauthorised' });
        }
    };

    const verify = async (request, response, next) => {
        try {
            // Input
            const authHeader = request.headers.token;
            // Treatment
            // const accessToken = authHeader.split(" ")[1];   
            // console.log(accessToken)
            const user = await accountService.verifyToken(authHeader, dependencies);

            //output
            next();
        } catch (err) {
            //Token Verification Failed
            next(new Error(`Verification Failed ${err.message}`));
        }
    };
    const addFavourite = async (request, response, next) => {
        try {
            const { movieId } = request.body;
            const id = request.params.id;
            const account = await accountService.addFavourite(id, movieId, dependencies);
            response.status(200).json(account);
        } catch (err) {
            response.status(500)
            next(new Error(`Invalid Data ${err.message}`));
        }
    };
    const addWatchlist = async (request, response, next) => {
        try {
            const { movieId } = request.body;
            const id = request.params.id;
            const account = await accountService.addWatchlist(id, movieId, dependencies);
            response.status(200).json(account);
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };
    const getFavourites = async (request, response, next) => {
        try {
            const id = request.params.id;
            const authHeader = request.headers.token;
            const userId = await accountService.verifyToken(authHeader, dependencies);
            if (userId == id) {
                const favourites = await accountService.getFavourites(id, dependencies);
                response.status(200).json(favourites);
            } else {
                response.status(401).json({ error: 'Unauthorized' });
            }
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };

    const getWatchlist = async (request, response, next) => {
        try {
            const id = request.params.id;
            const authHeader = request.headers.token;
            const userId = await accountService.verifyToken(authHeader, dependencies);
            if (userId == id) {
                const watchlist = await accountService.getWatchlist(id, dependencies);
                response.status(200).json(watchlist);
            } else {
                response.status(401).json({ error: 'Unauthorized' });
            }
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };
    const deleteWatchlist = async (request, response, next) => {
        try {
            const id = request.params.id;
            const movieId = request.query.movieId;
            const account = await accountService.deleteWatchlist(id, movieId, dependencies);
            response.status(200).json(account);
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };
    const deleteFavourite = async (request, response, next) => {
        try {
            const id = request.params.id;
            const movieId = request.query.movieId;
            const account = await accountService.deleteFavourite(id, movieId, dependencies);
            response.status(200).json(account);
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };

    return {
        createAccount,
        updateAccount,
        getAccount,
        getAccountId,
        listAccounts,
        authenticateAccount,
        getFavourites,
        addFavourite,
        deleteFavourite,
        addWatchlist,
        deleteWatchlist,
        getWatchlist,
        verify
    };
};

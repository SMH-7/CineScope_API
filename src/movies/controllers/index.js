import moviesService from "./../services";

export default (dependencies) => {

    const getMovieThumbnail = async (request, response, next) => {
        //input
        const id = request.params.id;
        // Treatment
        const movie = await moviesService.getThumbnail(id, dependencies);
        //output
        response.status(200).json(movie);
    };
    const getMovie = async (request, response, next) => {
        //input
        const movieId = request.params.id;
        // Treatment
        const movie = await moviesService.getMovie(movieId, dependencies);
        //output
        response.status(200).json(movie);
    };
    const getUpcomingMovies = async (request, response, next) => {
        const page = request.query.page;
        // Treatment
        const movies = await moviesService.findUpcoming(page, dependencies);
        // output 
        response.status(200).json(movies);
    };
    const find = async (request, response, next) => {
        //input
        const page = request.query.page; 
        // Treatment
        const movies = await moviesService.find(page, dependencies);
        //output
        response.status(200).json(movies);
    };

    return {
        getMovie,
        getUpcomingMovies,
        find,
        getMovieThumbnail
    };
};


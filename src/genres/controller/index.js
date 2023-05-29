import genresServices from "../services";

export default (dependencies) => {

    const getMovieGenres = async (request, response, next) => {
        //input
        const query = request.query;
        // Treatment
        const genres = await genresServices.getGenres(query, dependencies);
        //output
        response.status(200).json(genres);
    };

    const getMovieGenresName = async (request, response, next) => {
        //input
        const id = request.params.id;
        const query = request.query;
        // Treatment
        const genres = await genresServices.getGenres(query, dependencies);
        //output
        genres.genres.forEach(genre => {
            if (genre.id === id) {
              return response.status(200).json({ name: genre.name });
            }
          });
    };

    return {
        getMovieGenres,
        getMovieGenresName
    };

};

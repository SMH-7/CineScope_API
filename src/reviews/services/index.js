import axios from 'axios';

export default {
    getMovieReviews: async (id) => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`);
        return response.data;
    },
};
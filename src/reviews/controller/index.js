import reviewServices from "../services";

export default (dependencies) => {

    const getMovieReviews = async (request, response, next) => {
        //input
        const id = request.params.id;
        // Treatment
        const reviews = await reviewServices.getMovieReviews(id, dependencies);
        //output
        response.status(200).json(reviews);
    };

    return {
        getMovieReviews,
    };

};
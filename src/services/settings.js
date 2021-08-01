import React from "react";

const data = {
  API_KEY: "e7d38319a5111941a669823e8ecb3fd4",
  BASE_URL: "https://api.themoviedb.org/3",
  MOVIES_URL: "https://image.tmdb.org/t/p/w500",
  DATA_QUERY: {
    getTrending: "trending/movie/day",
    getMovieId: "movie/",
    searchMovie: "search/movie",
  },
};

export default data;

// /movie/{movie_id}/credits
// /movie/{movie_id}/reviews
// /search/movie

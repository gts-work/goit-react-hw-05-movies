import React from "react";

export const API_DATA = {
  API_KEY: "e7d38319a5111941a669823e8ecb3fd4",
  BASE_URL: "https://api.themoviedb.org/3",
  MOVIES_URL: "https://image.tmdb.org/t/p/w500",
  DATA_QUERY: {
    getTrending: "trending/movie/day",
    getMovieId: "movie/",
    searchMovie: "search/movie",
  },
};

export const NAV_TITLES = [
  { id: "t1", title: "Home", url: "/" },
  { id: "t2", title: "Movies", url: "/movies" },
];

// export default data;

// /movie/{movie_id}/credits
// /movie/{movie_id}/reviews
// /search/movie

import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";

import Navigation from "./components/Navigation";
import HomeView from "./views/HomeView";
import MoviesPage from "./views/MoviesPage";

import MovieDetailsPage from "./views/MovieDetailsPage";
import Cast from "./views/Cast";
import Reviews from "./views/Reviews";

function App() {
  return (
    <>
      <Navigation />

      <Switch>
        <Route exact path="/" component={HomeView} />
        <Route exact path="/movies" component={MoviesPage} />
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
      </Switch>
    </>
  );
}

export default App;

// API Key (v3 auth)
// e7d38319a5111941a669823e8ecb3fd4

// Example API Request
// https://api.themoviedb.org/3/movie/550?api_key=e7d38319a5111941a669823e8ecb3fd4

// API Read Access Token (v4 auth)
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlN2QzODMxOWE1MTExOTQxYTY2OTgyM2U4ZWNiM2ZkNCIsInN1YiI6IjYxMDQ0Njg5NDJkODM3MDA3MzIxYjVjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i_--VSlvKbM9Y8AfMOqYIeU4RSUgKRtlFvVUo06lrqA

// <Route path="/movies/:movieId" component={MovieDetailsPage} />
// <Route path="/movies/:movieId/cast" component={Cast} />
// <Route path="/movies/:movieId/reviews" component={Reviews} />

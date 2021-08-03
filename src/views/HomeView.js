import React, { useState, useEffect } from "react";

import MoviesApi from "../services/movieApi";
import styles from "./Views.module.css";
import MoviesList from "../components/MoviesList";

export default function HomeView() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = () => {
    MoviesApi.fetchMovies()
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => console.log("API fetchMovies ~ ERROR: ", error))
      .finally(console.log("API fetchMovies ~ FINALY: "));
  };

  return (
    <>
      <h1 className={styles.title}>Trending today</h1>
      {movies.length > 0 && <MoviesList movies={movies} />}
    </>
  );
}

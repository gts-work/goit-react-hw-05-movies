import React from "react";

import MovieItem from "../MovieItem";
import styles from "./MoviesList.module.css";

const MoviesList = ({ movies, url }) => {
  return (
    <ul className={styles.moviesList}>
      {movies.map(({ id, title, poster_path }) => (
        <MovieItem id={id} url={url} title={title} poster_path={poster_path} />
      ))}
    </ul>
  );
};

export default MoviesList;

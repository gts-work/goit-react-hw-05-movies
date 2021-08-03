import React, { PureComponent } from "react";

import MoviesApi from "../services/movieApi";
import styles from "./Views.module.css";
import MoviesList from "../components/MoviesList";

class HomeView extends PureComponent {
  state = {
    movies: [],
    links: {},
  };

  componentDidMount() {
    // this.setState({ movies:  });
    this.fetchTrendingMovies();
  }

  fetchTrendingMovies = () => {
    MoviesApi.fetchMovies()
      .then((data) => {
        // console.log("API fetchMovies ~ data: ", data);
        // console.log("API fetchMovies ~ results: ", data.results);

        this.setState({ movies: data.results });
      })
      .catch((error) => console.log("API fetchMovies ~ ERROR: ", error))
      .finally(console.log("API fetchMovies ~ FINALY: "));
  };

  render() {
    // const { url } = this.props.match;
    const { movies } = this.state;
    // console.log("HomeView ~ render ~ url: ", url);
    // console.log("HomeView ~ render ~ movies: ", movies);

    return (
      <>
        <h1 className={styles.title}>Trending today</h1>
        {movies.length > 0 && <MoviesList movies={movies} />}
      </>
    );
  }
}

export default HomeView;

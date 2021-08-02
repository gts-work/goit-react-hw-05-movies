import React, { PureComponent } from "react";
import { render } from "react-dom";
import { Route } from "react-router";

import settings from "../services/settings";
import MoviesApi from "../services/movieApi";
import styles from "./Views.module.css";
import MoviesList from "../components/MoviesList";

// import MovieDetailsPage from "./MovieDetailsPage";
// import Cast from "./Cast";
// import Reviews from "./Reviews";

export default class Movies extends PureComponent {
  state = {
    query: "",
    movies: null,
  };

  handleChange = (e) => {
    // setQuery(e.currentTarget.value);
    console.log("handleChange Movies ~ e: ", e.currentTarget.value);

    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    console.log("handleSubmit Movies ~ query: ", this.state.query);

    this.fetchSearchMovies();
    this.setState({ query: "" });
  };

  fetchSearchMovies = () => {
    const query = this.state.query;
    const apiQuery = `${settings.DATA_QUERY.searchMovie}`;
    const addQuery = `query=${query}`;

    MoviesApi.fetchMovies(apiQuery, addQuery)
      .then((data) => {
        console.log("Movies fetchMovies ~ data: ", data.results);

        this.setState({ movies: data.results });
      })
      .catch((error) => console.log("Movies fetchMovies ~ ERROR: ", error))
      .finally(() => {
        this.setState({ movies: this.state.movies });
        console.log("Movies fetchMovies ~ FINALY: ");
      });
  };

  render() {
    // const { url, path } = this.props.match;
    // console.log("Movies ~ render ~ path: ", path);
    // console.log("Movies ~ render ~ url: ", url);
    const urlMovieItem = "/";
    const { query, movies } = this.state;

    return (
      <>
        <form className={styles.search_form} onSubmit={this.handleSubmit}>
          <input
            className={styles.search_form_input}
            type="text"
            value={query}
            onChange={this.handleChange}
            autocomplete="off"
            autofocus
            placeholder="Search movies"
          />

          <button className={styles.search_btn} type="submit">
            Search
          </button>
        </form>

        {movies && <MoviesList movies={movies} url={urlMovieItem} />}
      </>
    );
  }
}

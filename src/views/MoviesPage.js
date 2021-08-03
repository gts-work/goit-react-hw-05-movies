import React, { useState, useEffect } from "react";
import {
  Route,
  NavLink,
  Link,
  Switch,
  Redirect,
  useLocation,
  useParams,
  useHistory,
} from "react-router-dom";

import { API_DATA } from "../services/settings";
import MoviesApi from "../services/movieApi";
import styles from "./Views.module.css";
import MoviesList from "../components/MoviesList";

// import MovieDetailsPage from "./MovieDetailsPage";
// import Cast from "./Cast";
// import Reviews from "./Reviews";

export default function Movies(props) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(null);

  const location = useLocation();
  const history = useHistory();
  const { path } = props.match;

  console.log("Movies ~ location", location);
  console.log("Movies ~ history", history);
  console.log("Movies ~ props", props);

  // localStorage. getItem ( 'user' )
  useEffect(() => {
    console.log("useEffect ~ useEffect: ");

    const queryType = location?.type ?? "";

    if (queryType ? localStorage.getItem("query") : "") {
      console.log("useEffect ~ localStorage: ", localStorage.getItem("query"));
      console.log("useEffect ~ query", query);

      setQuery(queryType ? localStorage.getItem("query") : "");

      if (query) {
        fetchSearchMovies();
        setQuery("");
        localStorage.setItem("query", "");
      }
    }

    // localStorage.getItem("query");
  }, [query]);

  const handleChange = (e) => {
    // console.log("handleChange Movies ~ e: ", e.currentTarget.value);
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log("handleSubmit Movies ~ query: ", this.state.query);

    fetchSearchMovies();
    setQuery("");
  };

  const fetchSearchMovies = () => {
    const apiQuery = `${API_DATA.DATA_QUERY.searchMovie}`;
    const addQuery = `query=${query}`;

    MoviesApi.fetchMovies(apiQuery, addQuery)
      .then((data) => {
        console.log("Movies fetchMovies ~ data: ", data.results);

        setMovies(data.results);
        localStorage.setItem("query", query);
      })
      .catch((error) => {
        console.log("Movies fetchMovies ~ ERROR: ", error);
        localStorage.setItem("query", "");
      })
      .finally(() => {
        console.log("Movies fetchMovies ~ FINALY: ");
      });
  };

  const urlMovieItem = "/";

  return (
    <>
      <form className={styles.search_form} onSubmit={handleSubmit}>
        <input
          className={styles.search_form_input}
          type="text"
          value={query}
          onChange={handleChange}
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

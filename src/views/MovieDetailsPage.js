import React, { PureComponent } from "react";
import { Route, NavLink, Link, Switch, Redirect } from "react-router-dom";

import HomeView from "./HomeView";
import Reviews from "./Reviews";
import Cast from "./Cast";
import MoviesApi from "../services/movieApi";
import settings from "../services/settings";
import styles from "./Views.module.css";
import { getFullUrl } from "../services/functions";

export default class MovieDetailsPage extends PureComponent {
  state = {
    movie: {},
    error: "",
  };

  componentDidMount() {
    this.fetchGetMovieId();
  }

  fetchGetMovieId = () => {
    const movieId = this.props.match.params.movieId;
    const apiQuery = `${settings.DATA_QUERY.getMovieId}/${movieId}`;

    console.log("MovieDetailsPage ~ movieId: ", movieId);

    MoviesApi.fetchMovies(apiQuery)
      .then((data) => {
        console.log("MovieDetailsPage fetchMovies ~ data: ", data);

        this.setState({ movie: data });
        this.setState({ error: "" });
      })
      .catch((error) => {
        console.log("MovieDetailsPage fetchMovies ~ ERROR: ", error);
        this.setState({ error: error });
      })
      .finally(() => {
        console.log("MovieDetailsPage fetchMovies ~ FINALY: ");
      });
  };

  render() {
    const { url, path, params } = this.props.match;
    const { movie, error } = this.state;
    const movieDate = new Date(movie.release_date);
    const movieYear = movieDate.getFullYear();

    // console.log("1 MovieDetailsPage ~ render ~ movieId: ", params.movieId);
    // console.log("1 MovieDetailsPage ~ render ~ genres: ", movie.genres);
    if (error) {
      return <Redirect to="/" />;
    } else {
      return (
        <>
          <Link to="/">
            <button className={styles.go_back_btn} type="button">
              <span className={styles.go_back_btn_larr}>&larr;</span> Go back
            </button>
          </Link>

          <div className={styles.view_detail_box}>
            <div className={styles.view_detail_info}>
              <img
                className={styles.big_poster}
                src={getFullUrl(movie.poster_path)}
                alt={movie.title}
              />

              <div>
                <h3 className={styles.view_detail_title}>
                  {movie.title} ({movieYear})
                </h3>

                <p className={styles.view_detail_score}>
                  User Score: {movie.vote_average * 10}
                </p>

                <h3>Overview</h3>
                <p>{movie.overview}</p>

                <h3>Genres</h3>
                {movie.genres && (
                  <ul className={styles.view_detail_genres}>
                    {movie.genres.map((genre) => {
                      return (
                        <li className={styles.view_detail_genre_item}>
                          {genre.name}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>

            <div className={styles.view_detail_add_block}>
              <h3 className={styles.view_detail_add_title}>
                Additional information
              </h3>
              <NavLink
                to={`${url}/cast`}
                className={styles.view_detail_add_link}
              >
                Cast
              </NavLink>
              <NavLink
                to={`${url}/reviews`}
                className={styles.view_detail_add_link}
              >
                Reviews
              </NavLink>
            </div>

            <Switch>
              <Route
                exact
                path={`${path}/cast`}
                render={() => {
                  return error ? (
                    <Redirect to="/" />
                  ) : (
                    <Cast movieId={params.movieId} />
                  );
                }}
              />
              <Route
                exact
                path={`${path}/reviews`}
                render={() => {
                  return error ? (
                    <Redirect to="/" />
                  ) : (
                    <Reviews movieId={params.movieId} />
                  );
                }}
              />
            </Switch>
          </div>
        </>
      );
    }
  }
}

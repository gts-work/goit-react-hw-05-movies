import React, { useState, useEffect } from "react";
import {
  Route,
  NavLink,
  Switch,
  Redirect,
  useLocation,
  useParams,
  useHistory,
} from "react-router-dom";

import Reviews from "./Reviews";
import Cast from "./Cast";
import MoviesApi from "../services/movieApi";
import { API_DATA } from "../services/settings";
import styles from "./Views.module.css";
import { getFullUrl } from "../services/functions";

// export default function MovieDetailsPage() {
//     const location = useLocation();
//     console.log("MovieDetailsPage ~ render ~ location:", location);

//     const { movieId } = useParams();
//     console.log("MovieDetailsPage ~ movieId: ", movieId);

//     const history = useHistory();
//     console.log("MovieDetailsPage ~ history: ", history);
// }

export default function MovieDetailsPage(props) {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");
  const { movieId } = useParams();
  const location = useLocation();
  const history = useHistory();
  const { path, url } = props.match;
  const [from, setFrom] = useState(location?.state?.from ?? "/");

  // console.log("MovieDetailsPage ~ props.url: ", url);
  // console.log("MovieDetailsPage ~ props.path: ", path);
  // console.log("MovieDetailsPage movieId: ", movieId);
  console.log("MovieDetailsPage location:", location);
  // console.log("MovieDetailsPage history:", history);

  useEffect(() => {
    fetchGetMovieId();
  }, []);

  const fetchGetMovieId = () => {
    const apiQuery = `${API_DATA.DATA_QUERY.getMovieId}/${movieId}`;

    MoviesApi.fetchMovies(apiQuery)
      .then((data) => {
        // console.log("MovieDetailsPage fetchMovies ~ data: ", data);

        if ("success" in data) {
          setError(data.status_message);
        } else {
          setMovie(data);
          setError("");
        }
      })
      .catch((error) => {
        // console.log("MovieDetailsPage fetchMovies ~ ERROR: ", error);
        setError(error);
      })
      .finally(() => {
        console.log("MovieDetailsPage fetchMovies ~ FINALY: ");
      });
  };

  const onGoBack = () => {
    console.log("onGoBack ~ from: ", from);
    history.push(from);
    history.push({ type: "go_back" });
  };

  const movieDate = new Date(movie.release_date);
  const movieYear = movieDate.getFullYear();

  // console.log("1 MovieDetailsPage ~ render ~ movieId: ", params.movieId);
  // console.log("1 MovieDetailsPage ~ render ~ genres: ", movie.genres);
  console.log("1 MovieDetailsPage ~ render ~ history: ", history);

  if (error) {
    return <Redirect to="/" />;
  } else {
    return (
      <>
        <button className={styles.go_back_btn} type="button" onClick={onGoBack}>
          <span className={styles.go_back_btn_larr}>&larr;</span> Go back
        </button>

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
            <NavLink to={`${url}/cast`} className={styles.view_detail_add_link}>
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
                return error ? <Redirect to="/" /> : <Cast movieId={movieId} />;
              }}
            />
            <Route
              exact
              path={`${path}/reviews`}
              render={() => {
                return error ? (
                  <Redirect to="/" />
                ) : (
                  <Reviews movieId={movieId} />
                );
              }}
            />
          </Switch>
        </div>
      </>
    );
  }
}

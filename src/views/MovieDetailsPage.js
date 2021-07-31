import React, { PureComponent } from "react";
import { Route, NavLink, Link } from "react-router-dom";

import Reviews from "./Reviews";
import Cast from "./Cast";
import MoviesApi from "../services/movieApi";
import settings from "../services/settings";
import styles from "./Views.module.css";
import { getFullUrl } from "../services/functions";

export default class MovieDetailsPage extends PureComponent {
  state = {
    movie: {},
  };

  componentDidMount() {
    // this.setState({ movies:  });
    this.fetchGetMovieId();
  }

  fetchGetMovieId = () => {
    const movieId = this.props.match.params.movieId;
    const apiQuery = `${settings.DATA_QUERY.getMovieId}/${movieId}`;

    MoviesApi.fetchMovies(apiQuery)
      .then((data) => {
        console.log("MovieDetailsPage fetchMovies ~ data: ", data);

        this.setState({ movie: data });

        // const imagesQuery = data.hits;
        // const totalImages = data.total;

        // setImages([...images, ...imagesQuery]);
        // setTotalImages(totalImages);
        // setCurrentPage(currentPage + 1);
        // setError("");

        // if (isLoadMore) {
        //     window.scrollTo({
        //         top: document.documentElement.scrollHeight,
        //         behavior: "smooth",
        //     });
        // }
      })
      .catch((error) =>
        console.log("MovieDetailsPage fetchMovies ~ ERROR: ", error)
      )
      .finally(() => {
        this.setState({ movie: this.state.movie });
        console.log("MovieDetailsPage fetchMovies ~ FINALY: ");
      });
  };

  render() {
    const { url, path, params } = this.props.match;
    const { movieId } = params.movieId;
    const { movie } = this.state;
    // const {
    //     title,
    //     overview,
    //     review,
    //     poster_path,
    //     release_date,
    //     vote_average,
    //     genres,
    // } = this.state.movie;

    console.log("1 MovieDetailsPage ~ render ~ movie: ", movie);
    console.log("1 MovieDetailsPage ~ render ~ genres: ", movie.genres);

    if (movie.genres) {
      const test = movie.genres.map((genre) => {
        console.log("GENRE: ", genre.name);
      });
    }

    return (
      <>
        <img
          className={styles.big_poster}
          src={getFullUrl(movie.poster_path)}
          alt={movie.title}
        />
        <h3>
          {movie.title} ({movie.release_date})
        </h3>

        <p>User Score: {movie.vote_average * 10}</p>

        <p>Overview</p>
        <p>{movie.overview}</p>

        <p>Genres</p>
        {movie.genres && (
          <ul>
            {movie.genres.map((genre) => {
              return <li>{genre.name}</li>;
            })}
          </ul>
        )}

        <hr />
        <h3>Additional information</h3>
        <NavLink to={`${url}/cast`}>
          <p>Cast</p>
        </NavLink>
        <NavLink to={`${url}/reviews`}>
          <p>Reviews</p>
        </NavLink>
        <Route
          path={`${path}/cast`}
          render={(props) => {
            // const bookId = Number(props.match.params.authorId);
            // const author = this.state.authors.find(
            //     ({ id }) => id === bookId
            // );

            return this.state.movie && <Cast {...props} movieId={movieId} />;
          }}
        />
        <Route
          path={`${path}/reviews`}
          render={(props) => {
            // const bookId = Number(props.match.params.authorId);
            // const author = this.state.authors.find(
            //     ({ id }) => id === bookId
            // );

            return this.state.movie && <Reviews {...props} movieId={movieId} />;
          }}
        />
      </>
    );
  }
}

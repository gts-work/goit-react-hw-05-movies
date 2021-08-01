import React, { PureComponent } from "react";

import settings from "../services/settings";
import MoviesApi from "../services/movieApi";
import { getFullUrl } from "../services/functions";
import styles from "./Views.module.css";

export default class Cast extends PureComponent {
  state = {
    credits: [],
  };

  componentDidMount() {
    // this.setState({ movies:  });
    this.fetchCastMovies();
  }

  fetchCastMovies = () => {
    const movieId = this.props.movieId;
    const apiQuery = `${settings.DATA_QUERY.getMovieId}/${movieId}/credits`;

    MoviesApi.fetchMovies(apiQuery)
      .then((data) => {
        console.log("CAST fetchMovies ~ data: ", data);
        console.log("CAST fetchMovies ~ results: ", data.cast);

        this.setState({ credits: data.cast });
      })
      .catch((error) => console.log("CAST fetchMovies ~ ERROR: ", error))
      .finally(console.log("CAST fetchMovies ~ FINALY: "));
  };

  // getAvatarPath = (object) => {
  //     return object.author_details.avatar_path.replace("/https:", "https:");
  // };

  render() {
    const { credits } = this.state;

    return (
      <>
        <h1>Cast page {this.props.movieId}</h1>

        <ul>
          {credits.length > 0 ? (
            credits.map((credit) => {
              return (
                <li>
                  {credit.profile_path && (
                    <img
                      className={styles.poster}
                      src={getFullUrl(credit.profile_path)}
                      alt={credit.name}
                    />
                  )}
                  <h4>Author: {credit.name}</h4>
                </li>
              );
            })
          ) : (
            <p>We don't have any for this movie cast</p>
          )}
        </ul>
      </>
    );
  }
}

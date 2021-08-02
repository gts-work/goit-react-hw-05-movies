import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";

import settings from "../services/settings";
import MoviesApi from "../services/movieApi";
import { getFullUrl } from "../services/functions";
import styles from "./Views.module.css";
import anonim from "../images/anonim.jpg";

export default class Cast extends PureComponent {
  state = {
    credits: [],
    error: "",
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
        this.setState({ error: "" });
      })
      .catch((error) => {
        console.log("CAST fetchMovies ~ ERROR: ", error);
        this.setState({ error: error });
      })
      .finally(console.log("CAST fetchMovies ~ FINALY: "));
  };

  // getAvatarPath = (object) => {
  //     return object.author_details.avatar_path.replace("/https:", "https:");
  // };

  render() {
    const { credits, error } = this.state;

    if (error) {
      return <Redirect to="/" />;
    } else {
      return (
        <>
          <div className={styles.cast_block}>
            <ul className={styles.cast_list}>
              {credits.length > 0 ? (
                credits.map((credit) => {
                  return (
                    <li>
                      {credit.profile_path ? (
                        <img
                          className={styles.poster_cast}
                          src={getFullUrl(credit.profile_path)}
                          alt={credit.name}
                        />
                      ) : (
                        <img
                          className={styles.poster_cast}
                          src={anonim}
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
          </div>
        </>
      );
    }
  }
}

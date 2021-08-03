import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { API_DATA } from "../services/settings";
import MoviesApi from "../services/movieApi";
import { getFullUrl } from "../services/functions";
import styles from "./Views.module.css";
import anonim from "../images/anonim.jpg";

export default function Cast(props) {
  const [credits, setCredits] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCastMovies();
  }, []);

  const fetchCastMovies = () => {
    const movieId = props.movieId;
    const apiQuery = `${API_DATA.DATA_QUERY.getMovieId}/${movieId}/credits`;

    console.log("Cast ~ movieId: ", movieId);

    MoviesApi.fetchMovies(apiQuery)
      .then((data) => {
        // console.log("CAST fetchMovies ~ data: ", data);
        // console.log("CAST fetchMovies ~ results: ", data.cast);

        setCredits(data.cast);
        setError("");
      })
      .catch((error) => {
        console.log("CAST fetchMovies ~ ERROR: ", error);
        // this.setState({ error: error });
        setError(error);
      })
      .finally(console.log("CAST fetchMovies ~ FINALY: "));
  };

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

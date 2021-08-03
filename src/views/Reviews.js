import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { API_DATA } from "../services/settings";
import MoviesApi from "../services/movieApi";
import styles from "./Views.module.css";

export default function Reviews(props) {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReviewsMovies();
  }, []);

  const fetchReviewsMovies = () => {
    const movieId = props.movieId;
    const apiQuery = `${API_DATA.DATA_QUERY.getMovieId}/${movieId}/reviews`;

    MoviesApi.fetchMovies(apiQuery)
      .then((data) => {
        // console.log("Reviews fetchMovies ~ results: ", data.results);

        setReviews(data.results);
        setError("");
      })
      .catch((error) => {
        console.log("Reviews fetchMovies ~ ERROR: ", error);
        setError(error);
      })
      .finally(console.log("Reviews fetchMovies ~ FINALY: "));
  };

  if (error) {
    return <Redirect to="/" />;
  } else {
    return (
      <>
        <div className={styles.reviews_block}>
          <ul className={styles.reviews_list}>
            {reviews.length > 0 ? (
              reviews.map((review) => {
                return (
                  <li>
                    <h4>Author: {review.author}</h4>
                    <p>{review.content}</p>
                  </li>
                );
              })
            ) : (
              <p>We don't have any for this movie reviews</p>
            )}
          </ul>
        </div>
      </>
    );
  }
}

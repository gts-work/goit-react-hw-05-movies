import React, { PureComponent } from "react";

import settings from "../services/settings";
import MoviesApi from "../services/movieApi";
import styles from "./Views.module.css";

export default class Reviews extends PureComponent {
  state = {
    reviews: [],
  };

  componentDidMount() {
    // this.setState({ movies:  });
    this.fetchReviewsMovies();
  }

  fetchReviewsMovies = () => {
    const movieId = this.props.movieId;
    const apiQuery = `${settings.DATA_QUERY.getMovieId}/${movieId}/reviews`;

    MoviesApi.fetchMovies(apiQuery)
      .then((data) => {
        console.log("Reviews fetchMovies ~ data: ", data);
        console.log("Reviews fetchMovies ~ results: ", data.results);

        this.setState({ reviews: data.results });

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
      .catch((error) => console.log("Reviews fetchMovies ~ ERROR: ", error))
      .finally(console.log("Reviews fetchMovies ~ FINALY: "));
  };

  getAvatarPath = (object) => {
    return object.author_details.avatar_path.replace("/https:", "https:");
  };

  render() {
    const { reviews } = this.state;

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

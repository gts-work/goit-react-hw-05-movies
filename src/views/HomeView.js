import React, { PureComponent } from "react";

import MoviesApi from "../services/movieApi";
import data from "../services/settings";
import styles from "./Views.module.css";

class HomeView extends PureComponent {
  state = {
    movies: [],
  };

  componentDidMount() {
    // this.setState({ movies:  });
    this.fetchTrendingMovies();
  }

  fetchTrendingMovies = () => {
    MoviesApi.fetchMovies()
      .then((data) => {
        console.log("API fetchMovies ~ data: ", data);
        console.log("API fetchMovies ~ results: ", data.results);

        this.setState({ movies: data.results });

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
      .catch((error) => console.log("API fetchMovies ~ ERROR: ", error))
      .finally(console.log("API fetchMovies ~ FINALY: "));
  };

  getFullUrl = (url) => {
    return `${data.MOVIES_URL}${url}`;
  };

  render() {
    return (
      <>
        <h1>Tranding today</h1>
        <ul>
          {this.state.movies.map(({ id, title, poster_path }) => (
            <li key={id}>
              <img
                className={styles.poster}
                src={this.getFullUrl(poster_path)}
                alt={title}
              />
              {title}
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default HomeView;

// const HomeView = () => {
//     MoviesApi.fetchMovies()
//         .then((data) => {
//             console.log("API fetchMovies ~ data: ", data);
//             console.log("API fetchMovies ~ results: ", data.results);

//             // const imagesQuery = data.hits;
//             // const totalImages = data.total;

//             // setImages([...images, ...imagesQuery]);
//             // setTotalImages(totalImages);
//             // setCurrentPage(currentPage + 1);
//             // setError("");

//             // if (isLoadMore) {
//             //     window.scrollTo({
//             //         top: document.documentElement.scrollHeight,
//             //         behavior: "smooth",
//             //     });
//             // }
//         })
//         .catch((error) => console.log("API fetchMovies ~ ERROR: ", error))
//         .finally(console.log("API fetchMovies ~ FINALY: "));
//     return <h1>Это домашняя страница</h1>;
// };

// export default HomeView;

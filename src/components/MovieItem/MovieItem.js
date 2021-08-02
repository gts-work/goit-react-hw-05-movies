import React from "react";
import { Link } from "react-router-dom";

import { getFullUrl } from "../../services/functions";
import styles from "./MovieItem.module.css";

export default function MovieItem({ id, url, title, poster_path }) {
  return (
    <li key={id} className={styles.movie_item_block}>
      <Link to={`${url}movies/${id}`}>
        <img
          className={styles.poster}
          src={getFullUrl(poster_path)}
          alt={title}
        />
        <span className={styles.movie_name}>{title}</span>
      </Link>
    </li>
  );
}

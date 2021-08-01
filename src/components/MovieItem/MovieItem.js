import React from "react";
import { Link } from "react-router-dom";

import { getFullUrl } from "../../services/functions";
import styles from "./MovieItem.module.css";

export default function MovieItem({ id, url, title, poster_path }) {
  // const { url, path } = props.match;

  return (
    <li key={id}>
      <Link to={`${url}movies/${id}`}>
        <img
          className={styles.poster}
          src={getFullUrl(poster_path)}
          alt={title}
        />
        {title}
      </Link>
    </li>
  );
}

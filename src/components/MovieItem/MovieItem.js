import React, { useState, useEffect } from "react";
import { Link, useRouteMatch, useLocation, useHistory } from "react-router-dom";

import { NAV_TITLES } from "../../services/settings";
import { getFullUrl } from "../../services/functions";
import styles from "./MovieItem.module.css";

export default function MovieItem({ id, title, poster_path }) {
  const routematch = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const [url, setUrl] = useState("/");

  useEffect(() => {
    getNavUrl("Movies");
  }, []);

  const getNavUrl = (name) => {
    NAV_TITLES.filter((nav) => {
      if (nav.title === name) {
        setUrl(nav.url);
        return;
      }
    });
    return;
  };

  // console.log("MovieItem ~ url: ", url);
  // console.log("MovieItem ~ history: ", history);
  // console.log("MovieItem ~ location: ", location);
  // console.log("MovieItem ~ routematch: ", routematch.url);

  return (
    <li key={id} className={styles.movie_item_block}>
      <Link
        to={{
          pathname: `${url}/${id}`,
          state: { from: location },
        }}
      >
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

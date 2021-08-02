import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const NAV_TITLES = [
  { id: "t1", title: "Home", url: "/" },
  { id: "t2", title: "Movies", url: "/movies" },
];

export default function Navigation() {
  return (
    <nav>
      <ul className={styles.nav_container}>
        {NAV_TITLES.map((nav) => {
          const { id, url, title } = nav;

          return id === "t1" ? (
            <li key={id}>
              <NavLink
                exact
                to={url}
                className={styles.nav_link}
                activeClassName={styles.nav_link_active}
              >
                {title}
              </NavLink>
            </li>
          ) : (
            <li key={id}>
              <NavLink
                to={url}
                className={styles.nav_link}
                activeClassName={styles.nav_link_active}
              >
                {title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

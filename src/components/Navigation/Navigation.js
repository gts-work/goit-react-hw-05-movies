import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const NAV_TITLES = [
  { id: "t1", title: "Home", url: "/" },
  { id: "t2", title: "Movies", url: "/movies" },
];

export default function Navigation() {
  return (
    <ul>
      {NAV_TITLES.map((nav) => {
        return (
          <li key={nav.id}>
            <NavLink
              exact
              to={nav.url}
              className={styles.nav_link}
              activeClassName={styles.nav_link_active}
            >
              {nav.title}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}

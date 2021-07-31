import React, { PureComponent } from "react";
import { render } from "react-dom";
import { Route } from "react-router";

// import MovieDetailsPage from "./MovieDetailsPage";
// import Cast from "./Cast";
// import Reviews from "./Reviews";

export default class Movies extends PureComponent {
  state = {};

  render() {
    const { url, path } = this.props.match;

    return (
      <>
        <h1>Movie Page</h1>
      </>
    );
  }
}

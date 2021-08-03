import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Loader from "./components/Loader";

const Navigation = lazy(() =>
  import("./components/Navigation" /* webpackChunkName: "navigation" */)
);

const HomeView = lazy(() =>
  import("./views/HomeView.js" /* webpackChunkName: "home-view" */)
);

const MoviesPage = lazy(() =>
  import("./views/MoviesPage.js" /* webpackChunkName: "movies-page" */)
);

const MovieDetailsPage = lazy(() =>
  import(
    "./views/MovieDetailsPage.js" /* webpackChunkName: "movie-details-page" */
  )
);

function App() {
  return (
    <div className="container">
      <Suspense fallback={<Loader />}>
        <Navigation />

        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route exact path="/movies" component={MoviesPage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;

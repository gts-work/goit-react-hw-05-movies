import React from "react";
import MoviesApi from "../services/movieApi";

const Cast = ({ movieId }) => {
  console.log("Cast ~ movieId: ", movieId);
  return <h1>Cast page {movieId}</h1>;
};

export default Cast;

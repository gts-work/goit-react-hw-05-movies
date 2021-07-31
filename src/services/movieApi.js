import axios from "axios";
import data from "./settings";

const instance = axios.create();
instance.defaults.baseURL = data.BASE_URL;

const DATA_QUERY = {
  getTrending: "trending/movie/day",
};

async function fetchMovies(queryType = DATA_QUERY.getTrending) {
  const query = `${queryType}?api_key=${data.API_KEY}`;

  // console.log("fetchImages ~ searchQuery: ", searchQuery);
  // console.log("fetchImages ~ currentPage: ", currentPage);

  const userRequest = await instance
    .get(`${query}`)
    .then((response) => response.data);
  return userRequest;
}

export default { fetchMovies };

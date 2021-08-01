import axios from "axios";
import settings from "./settings";

const instance = axios.create();
instance.defaults.baseURL = settings.BASE_URL;

async function fetchMovies(
  queryType = settings.DATA_QUERY.getTrending,
  addQuery = ""
) {
  const query = `${queryType}?api_key=${settings.API_KEY}&${addQuery}`;

  // console.log("fetchImages ~ searchQuery: ", searchQuery);
  // console.log("fetchImages ~ currentPage: ", currentPage);

  const userRequest = await instance
    .get(`${query}`)
    .then((response) => response.data);
  return userRequest;
}

export default { fetchMovies };

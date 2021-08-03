import axios from "axios";
import { API_DATA } from "./settings";

const instance = axios.create();
instance.defaults.baseURL = API_DATA.BASE_URL;

async function fetchMovies(
  queryType = API_DATA.DATA_QUERY.getTrending,
  addQuery = ""
) {
  const query = `${queryType}?api_key=${API_DATA.API_KEY}&${addQuery}`;

  // console.log("fetchImages ~ searchQuery: ", searchQuery);
  // console.log("fetchImages ~ currentPage: ", currentPage);

  const userRequest = await instance
    .get(`${query}`)
    .then((response) => response.data);
  return userRequest;
}

export default { fetchMovies };

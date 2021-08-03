import { API_DATA } from "./settings";
import noMovie from "../images/no-movie.jpeg";

function getFullUrl(url) {
  if (url) {
    return `${API_DATA.MOVIES_URL}${url}`;
  } else {
    return noMovie;
  }
}

export { getFullUrl };

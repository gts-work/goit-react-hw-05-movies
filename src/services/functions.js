import settings from "./settings";

function getFullUrl(url) {
  return `${settings.MOVIES_URL}${url}`;
}

export { getFullUrl };

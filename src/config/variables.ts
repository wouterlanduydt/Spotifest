export const BACKEND_URLS = {
  PROD: "https://spotify-top-artists-backend.herokuapp.com/login",
  LOCAL: "http://localhost:8888/login"
};

export const timeRanges = [
  { value: "short_term", label: "Short term" },
  { value: "medium_term", label: "Medium term" },
  { value: "long_term", label: "Long term" }
];

export const DEFAULT_BG = "https://lorempixel.com/480/640/nightlife";

export const SPOTIFY_API = {
  TOP_ARTISTS: "https://api.spotify.com/v1/me/top/artists",
  ME: "https://api.spotify.com/v1/me"
};

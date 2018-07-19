export const BACKEND_URLS = {
  PROD: "https://spotify-top-artists-backend.herokuapp.com/login",
  LOCAL: "http://localhost:8888/login"
};

export const timeRanges = [
  { value: "short_term", label: "Short term" },
  { value: "medium_term", label: "Medium term" },
  { value: "long_term", label: "Long term" }
];

export const defaultBackgroundUrl =
  "https://assets.sk-static.com/assets/nw/components/homepage/hero-3-f594edb.jpg";

export const SPOTIFY_ENDPOINTS = {
  topArtists: "https://api.spotify.com/v1/me/top/artists",
  me: "https://api.spotify.com/v1/me"
};

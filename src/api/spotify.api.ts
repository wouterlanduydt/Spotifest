import SpotifyWebApi from 'spotify-web-api-js';
import { isRunningLocally } from 'lib';

export const spotifyApi = new SpotifyWebApi();

export const authorizeSpotifyApi = () => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

  const redirectUri = isRunningLocally ? 'http://localhost:3000' : process.env.REACT_APP_URL;

  const scopes = ['user-read-private', 'user-read-email', 'user-top-read'];

  window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    ' ',
  )}&response_type=token&show_dialog=true`;
};

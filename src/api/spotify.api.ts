import SpotifyWebApi from 'spotify-web-api-js';
import { ETimeRange } from 'types/general';

export const spotifyApi = new SpotifyWebApi();

export const fetchUserDetails = () => spotifyApi.getMe();

export const fetchTopArtists = (time_range: ETimeRange) =>
  spotifyApi.getMyTopArtists({ limit: 50, time_range });

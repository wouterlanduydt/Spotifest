import SpotifyWebApi from 'spotify-web-api-js';
import { ETimeRange } from 'types/general';
import { isRunningLocally } from 'lib';

export const spotifyApi = new SpotifyWebApi();

export const authorizeSpotifyApi = () => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

  const redirectUri = isRunningLocally ? 'http://localhost:3000' : process.env.REACT_APP_URL;
  const scope =
    'user-read-private user-read-email user-top-read playlist-modify-private playlist-modify-public';

  // @ts-ignore
  window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token&show_dialog=true`;
};

export const fetchUserDetails = () => spotifyApi.getMe();

export const fetchTopArtists = (options: { time_range: ETimeRange; [key: string]: string }) =>
  spotifyApi.getMyTopArtists({ limit: 50, ...options });

export const fetchTopSongs = (options: { time_range: ETimeRange; [key: string]: string }) =>
  spotifyApi.getMyTopTracks({ limit: 50, ...options });

export const fetchAudioFeatures = (trackIds: string[]) =>
  spotifyApi.getAudioFeaturesForTracks(trackIds);

export const fetchRecommendations = (options: SpotifyApi.RecommendationsOptionsObject) =>
  spotifyApi.getRecommendations({ ...options, limit: 100 });

export const postCreatePlaylist = (userId: string, options: Object) =>
  spotifyApi.createPlaylist(userId, options);

export const postAddTracksToPlaylist = (playlistId: string, uris: string[], options?: Object) =>
  spotifyApi.addTracksToPlaylist(playlistId, uris, options);

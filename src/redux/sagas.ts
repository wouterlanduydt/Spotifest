import { call, put, takeLatest, all } from 'redux-saga/effects';
import { spotifyActions } from './actions';
import * as spotifyApi from 'api/spotify.api';
import queryString from 'query-string';
import { ETimeRange, TExtendedArtist } from 'types/general';
import { getUnique } from 'lib';

export function* appReadyFlow() {
  try {
    const accessTokenFromUrl = yield queryString.parse(window.location.hash).access_token;
    const tokenFromStorage = yield localStorage.getItem('spotify_token');

    if (accessTokenFromUrl) {
      yield localStorage.setItem('spotify_token', String(accessTokenFromUrl));
      yield spotifyApi.spotifyApi.setAccessToken(String(accessTokenFromUrl));
    } else if (!!tokenFromStorage && tokenFromStorage !== 'undefined') {
      yield spotifyApi.spotifyApi.setAccessToken(tokenFromStorage);
    }
    const userDetails = yield call(spotifyApi.fetchUserDetails);
    yield put(spotifyActions.getUserDetailsSuccess(userDetails));
  } catch (e) {
    localStorage.clear();
    spotifyApi.authorizeSpotifyApi();
    yield put(spotifyActions.getUserDetailsFail(e));
  }
}

function* getTopArtistsFlow() {
  try {
    let artists: TExtendedArtist[] = [];

    for (let range in ETimeRange) {
      const time_range = range as ETimeRange;

      const data: { items: SpotifyApi.ArtistObjectFull[] } = yield call(
        spotifyApi.fetchTopArtists,
        { time_range },
      );

      const extendedArtists = data.items.map(artist => ({
        ...artist,
        time_range,
      }));

      artists.push(...extendedArtists);
      artists = getUnique(artists, 'id');
    }

    yield put(spotifyActions.getTopArtistsSuccess(artists));
  } catch (error) {
    yield put(spotifyActions.getTopArtistsFail(error));
  }
}

function* saga() {
  yield all([appReadyFlow(), takeLatest(spotifyActions.getTopArtistsStart, getTopArtistsFlow)]);
}

export default saga;

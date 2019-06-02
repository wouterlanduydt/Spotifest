import { call, put, takeLatest, select, takeEvery, all } from 'redux-saga/effects';
import { spotifyActions, songkickActions } from './actions';
import * as spotifyApi from 'api/spotify.api';
import { ETimeRange } from 'types/general';
import { IState } from './reducers';
import * as songkickApi from 'api/songkick.api';
import { Event } from 'types/songkick';
import queryString from 'query-string';
import { union } from 'lodash';

type TAction<T = void> = {
  type: string;
  payload: T;
};

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

function* getTopArtistsFlow({ payload: timeRange }: TAction<ETimeRange>) {
  try {
    const { items: value }: { items: SpotifyApi.ArtistObjectFull[] } = yield call(
      spotifyApi.fetchTopArtists,
      timeRange,
    );

    yield put(spotifyActions.getTopArtistsSuccess({ timeRange, value }));
  } catch (error) {
    yield put(spotifyActions.getTopArtistsFail({ timeRange, error }));
  }
}

function* getConcertsFlow() {
  try {
    const _artists: string[][] = [];

    for (let timeRange in ETimeRange) {
      const { items: artistsForTimeRange }: SpotifyApi.UsersTopArtistsResponse = yield call(
        spotifyApi.fetchTopArtists,
        ETimeRange[timeRange] as ETimeRange,
      );
      _artists.push(artistsForTimeRange.map(artist => artist.name));
    }

    const artists: string[] = union(..._artists);

    const concerts: { [name: string]: Event[] } = {};

    if (artists) {
      for (let artist of artists) {
        const { results } = yield call(songkickApi.getEventsByArtist, artist);
        concerts[artist] = results.event || [];
      }
    }
    yield put(songkickActions.getConcertsSuccess(concerts));
  } catch (error) {
    yield put(songkickActions.getConcertsFail(error));
  }
}

function* createPlaylistFlow({ payload: artists }: TAction<SpotifyApi.ArtistObjectFull[]>) {
  try {
    const user: IState['user']['value'] = yield select((state: IState) => state.user.value);
    if (user) {
      const seed_artists = artists.slice(0, 5).map(artist => artist.id);
      const { tracks }: SpotifyApi.RecommendationsFromSeedsResponse = yield call(
        spotifyApi.fetchRecommendations,
        {
          seed_artists,
          market: user.country,
          target_popularity: 50,
        },
      );
      const playlistInfo = {
        name: `Spotifest Recommends`,
        description: `A playlist containing recommended tracks based on artists like ${artists
          .slice(0, 5)
          .map(artist => ` ${artist.name}`)},... - Created for ${
          user.display_name
        } by Spotifest app.`,
      };

      const playlist = yield call(spotifyApi.postCreatePlaylist, user.id, playlistInfo);
      yield call(spotifyApi.postAddTracksToPlaylist, playlist.id, tracks.map(track => track.uri));
      yield put(spotifyActions.createPlaylistSuccess(playlist));
    }
  } catch (error) {
    yield put(spotifyActions.createPlaylistFail(error));
  }
}

function* saga() {
  yield all([
    appReadyFlow(),
    takeLatest(spotifyActions.getTopArtistsStart, getTopArtistsFlow),
    takeLatest(spotifyActions.createPlaylistStart, createPlaylistFlow),
    takeEvery(songkickActions.getConcertsStart, getConcertsFlow),
  ]);
}

export default saga;

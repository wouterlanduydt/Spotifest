import { call, put, takeLatest, select, takeEvery } from 'redux-saga/effects';
import { spotifyActions, songkickActions } from './actions';
import * as spotifyApi from 'api/spotify.api';
import { ETimeRange } from 'types/general';
import { IState } from './reducers';
import * as songkickApi from 'api/songkick.api';

type TAction<T = void> = {
  type: string;
  payload: T;
};

function* getUserDetailsFlow() {
  try {
    const userDetails = yield call(spotifyApi.fetchUserDetails);
    yield put(spotifyActions.getUserDetailsSuccess(userDetails));
  } catch (e) {
    // @ts-ignore
    window.location = '/';
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

function* getArtistConcertsFlow({ payload: timeRange }: TAction<ETimeRange>) {
  try {
    const artists: IState['artists'][ETimeRange]['value'] = yield select(
      (state: IState) => state.artists[timeRange].value,
    );

    const concerts: { [name: string]: any } = {};

    if (artists) {
      for (let { name } of artists) {
        const { results } = yield call(songkickApi.getEventsByArtist, name);
        concerts[name] = results.event || [];
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
  yield takeLatest(spotifyActions.getUserDetailsStart, getUserDetailsFlow);
  yield takeLatest(spotifyActions.getTopArtistsStart, getTopArtistsFlow);
  yield takeLatest(spotifyActions.createPlaylistStart, createPlaylistFlow);
  yield takeEvery(songkickActions.getConcertsStart, getArtistConcertsFlow);
}

export default saga;

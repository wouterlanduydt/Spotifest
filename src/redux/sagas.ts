import { call, put, takeLatest, select, takeEvery, all } from 'redux-saga/effects';
import { spotifyActions, songkickActions } from './actions';
import * as spotifyApi from 'api/spotify.api';
import { IState } from './reducers';
import * as songkickApi from 'api/songkick.api';
import { Event } from 'types/songkick';
import queryString from 'query-string';
import { ETimeRange, TExtendedArtist, EPosterMeta, TPosterMeta } from 'types/general';
import { getUnique, getAverage, getMedian } from 'lib';
import { getArtists } from './selectors';

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

function* getTopArtistsFlow() {
  try {
    let artists: TExtendedArtist[] = [];

    for (let range in ETimeRange) {
      const time_range = ETimeRange[range] as ETimeRange;

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

function* getPosterMetaFlow() {
  try {
    const { items: topSongs }: SpotifyApi.UsersTopTracksResponse = yield call(
      spotifyApi.fetchTopSongs,
      { time_range: ETimeRange.long },
    );
    const { audio_features: audioFeatures }: SpotifyApi.MultipleAudioFeaturesResponse = yield call(
      spotifyApi.fetchAudioFeatures,
      topSongs.map(({ id }) => id),
    );

    const getHumanReadableAvg = (type: 'avg' | 'median', field: EPosterMeta, digits?: number) => {
      const flattenedArr = audioFeatures.map(audioFeature => audioFeature[field]);
      const value = type === 'median' ? getMedian(flattenedArr) : getAverage(flattenedArr);

      return +value.toFixed(digits);
    };

    const posterMeta: TPosterMeta = {
      danceability: getHumanReadableAvg('avg', EPosterMeta.danceability, 2),
      energy: getHumanReadableAvg('avg', EPosterMeta.energy, 2),
      key: getHumanReadableAvg('median', EPosterMeta.key),
      tempo: getHumanReadableAvg('avg', EPosterMeta.tempo),
    };

    yield put(spotifyActions.getPosterMetaSuccess(posterMeta));
  } catch (error) {
    yield put(spotifyActions.getPosterMetaFail(error));
  }
}

function* getConcertsFlow() {
  try {
    const artists: TExtendedArtist[] = yield select(getArtists);
    if (artists.length === 0) yield put(spotifyActions.getTopArtistsStart());

    const concerts: { [name: string]: Event[] } = {};

    for (let artist of artists) {
      const { results } = yield call(songkickApi.getEventsByArtist, artist.name);
      concerts[artist.name] = results.event || [];
    }
    yield put(songkickActions.getConcertsSuccess(concerts));
  } catch (error) {
    yield put(songkickActions.getConcertsFail(error));
  }
}

function* createPlaylistFlow() {
  try {
    const artists: TExtendedArtist[] = yield select(getArtists);
    if (artists.length === 0) yield put(spotifyActions.getTopArtistsStart());

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
    takeLatest(spotifyActions.getPosterMetaStart, getPosterMetaFlow),
    takeLatest(spotifyActions.createPlaylistStart, createPlaylistFlow),
    takeEvery(songkickActions.getConcertsStart, getConcertsFlow),
  ]);
}

export default saga;

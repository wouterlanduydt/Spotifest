import { createAction } from 'redux-act';
import { Event } from 'types/songkick';
import { TExtendedArtist, TPosterMeta } from 'types/general';

export const spotifyActions = {
  getUserDetailsStart: createAction('GET_USER_DETAILS_START'),
  getUserDetailsSuccess: createAction<SpotifyApi.UserObjectPrivate>('GET_USER_DETAILS_SUCCESS'),
  getUserDetailsFail: createAction<Error>('GET_USER_DETAILS_FAIL'),

  getTopArtistsStart: createAction('GET_TOP_ARTISTS_START'),
  getTopArtistsSuccess: createAction<TExtendedArtist[]>('GET_TOP_ARTISTS_SUCCESS'),
  getTopArtistsFail: createAction<Error>('GET_TOP_ARTISTS_FAIL'),

  getPosterMetaStart: createAction('GET_POSTER_META_START'),
  getPosterMetaSuccess: createAction<TPosterMeta>('GET_POSTER_META_SUCCESS'),
  getPosterMetaFail: createAction<Error>('GET_POSTER_META_FAIL'),

  createPlaylistStart: createAction('CREATE_PLAYLIST_START'),
  createPlaylistSuccess: createAction<SpotifyApi.CreatePlaylistResponse>('CREATE_PLAYLIST_SUCCESS'),
  createPlaylistFail: createAction<Error>('CREATE_PLAYLIST_FAIL'),
};

export const songkickActions = {
  getConcertsStart: createAction('GET_CONCERTS_START'),
  getConcertsSuccess: createAction<{ [name: string]: Event[] }>('GET_CONCERTS_SUCCESS'),
  getConcertsFail: createAction<Error>('GET_CONCERTS_FAIL'),
};

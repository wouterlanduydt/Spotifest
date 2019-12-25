import { createAction } from 'redux-act';
import { TExtendedArtist } from 'types/general';

export const spotifyActions = {
  getUserDetailsStart: createAction('GET_USER_DETAILS_START'),
  getUserDetailsSuccess: createAction<SpotifyApi.UserObjectPrivate>('GET_USER_DETAILS_SUCCESS'),
  getUserDetailsFail: createAction<Error>('GET_USER_DETAILS_FAIL'),

  getTopArtistsStart: createAction('GET_TOP_ARTISTS_START'),
  getTopArtistsSuccess: createAction<TExtendedArtist[]>('GET_TOP_ARTISTS_SUCCESS'),
  getTopArtistsFail: createAction<Error>('GET_TOP_ARTISTS_FAIL'),
};

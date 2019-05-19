import { createAction } from 'redux-act';
import { ETimeRange } from 'types/general';

export const getAccessToken = createAction('GET_ACCESS_TOKEN');

export const getUserDetailsStart = createAction('GET_USER_DETAILS_START');
export const getUserDetailsSuccess = createAction<SpotifyApi.UserObjectPrivate>(
  'GET_USER_DETAILS_SUCCESS',
);
export const getUserDetailsFail = createAction<Error>('GET_USER_DETAILS_FAIL');

export const getTopArtistsStart = createAction<ETimeRange>('GET_TOP_ARTISTS_START');
export const getTopArtistsSuccess = createAction<{
  timeRange: ETimeRange;
  value: SpotifyApi.ArtistObjectFull[];
}>('GET_TOP_ARTISTS_SUCCESS');
export const getTopArtistsFail = createAction<{ timeRange: ETimeRange; error: Error }>(
  'GET_TOP_ARTISTS_FAIL',
);

export const createPlaylistStart = createAction<SpotifyApi.ArtistObjectFull[]>(
  'CREATE_PLAYLIST_START',
);
export const createPlaylistSuccess = createAction('CREATE_PLAYLIST_SUCCESS');
export const createPlaylistFail = createAction<Error>('CREATE_PLAYLIST_FAIL');

import { createReducer } from 'redux-act';
import {
  getUserDetailsStart,
  getUserDetailsSuccess,
  getUserDetailsFail,
  getTopArtistsStart,
  getTopArtistsSuccess,
  getTopArtistsFail,
  createPlaylistStart,
  createPlaylistSuccess,
  createPlaylistFail,
} from './actions';
import { ETimeRange } from 'types/general';

export type TTopArtists = {
  value: SpotifyApi.ArtistObjectFull[] | null;
  isLoading: boolean;
  error: Error | null;
};

export interface IState {
  user: {
    value: SpotifyApi.UserObjectPrivate | null;
    isLoading: boolean;
    error: Error | null;
  };
  artists: {
    [ETimeRange.short]: TTopArtists;
    [ETimeRange.medium]: TTopArtists;
    [ETimeRange.long]: TTopArtists;
  };
  createPlaylist: {
    value: any;
    isLoading: boolean;
    error: Error | null;
  };
}

const initialState = {
  user: {
    value: null,
    isLoading: false,
    error: null,
  },
  artists: {
    [ETimeRange.short]: {
      value: null,
      isLoading: false,
      error: null,
    },
    [ETimeRange.medium]: {
      value: null,
      isLoading: false,
      error: null,
    },
    [ETimeRange.long]: {
      value: null,
      isLoading: false,
      error: null,
    },
  },
  createPlaylist: {
    value: null,
    isLoading: false,
    error: null,
  },
};

const reducer = createReducer<IState>({}, initialState);

/**
 * user details
 */
reducer.on(getUserDetailsStart, state => ({
  ...state,
  user: {
    value: null,
    isLoading: true,
    error: null,
  },
}));

reducer.on(getUserDetailsSuccess, (state, value) => ({
  ...state,
  user: {
    value,
    isLoading: false,
    error: null,
  },
}));

reducer.on(getUserDetailsFail, (state, error) => ({
  ...state,
  user: {
    value: null,
    isLoading: false,
    error,
  },
}));

/**
 * top artists
 */
reducer.on(getTopArtistsStart, (state, timeRange) => ({
  ...state,
  artists: {
    ...state.artists,
    [timeRange]: {
      value: null,
      isLoading: true,
      error: null,
    },
  },
}));

reducer.on(getTopArtistsSuccess, (state, { timeRange, value }) => ({
  ...state,
  artists: {
    ...state.artists,
    [timeRange]: {
      value,
      isLoading: false,
      error: null,
    },
  },
}));

reducer.on(getTopArtistsFail, (state, { timeRange, error }) => ({
  ...state,
  artists: {
    ...state.artists,
    [timeRange]: {
      value: null,
      isLoading: false,
      error,
    },
  },
}));

/**
 * create playlist
 */
reducer.on(createPlaylistStart, (state, timeRange) => ({
  ...state,
  createPlaylist: {
    value: null,
    isLoading: true,
    error: null,
  },
}));

reducer.on(createPlaylistSuccess, state => ({
  ...state,
  createPlaylist: {
    value: null,
    isLoading: false,
    error: null,
  },
}));

reducer.on(createPlaylistFail, (state, error) => ({
  ...state,
  createPlaylist: {
    value: null,
    isLoading: false,
    error,
  },
}));

export default reducer;

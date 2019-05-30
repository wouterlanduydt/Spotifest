import { createReducer } from 'redux-act';
import { spotifyActions, songkickActions } from './actions';
import { ETimeRange } from 'types/general';

export type TTopArtists = {
  value: SpotifyApi.ArtistObjectFull[];
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
  concerts: {
    value: { [name: string]: any } | null;
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
      value: [],
      isLoading: false,
      error: null,
    },
    [ETimeRange.medium]: {
      value: [],
      isLoading: false,
      error: null,
    },
    [ETimeRange.long]: {
      value: [],
      isLoading: false,
      error: null,
    },
  },
  concerts: {
    value: null,
    isLoading: false,
    error: null,
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
reducer.on(spotifyActions.getUserDetailsStart, state => ({
  ...state,
  user: {
    value: null,
    isLoading: true,
    error: null,
  },
}));

reducer.on(spotifyActions.getUserDetailsSuccess, (state, value) => ({
  ...state,
  user: {
    value,
    isLoading: false,
    error: null,
  },
}));

reducer.on(spotifyActions.getUserDetailsFail, (state, error) => ({
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
reducer.on(spotifyActions.getTopArtistsStart, (state, timeRange) => ({
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

reducer.on(spotifyActions.getTopArtistsSuccess, (state, { timeRange, value }) => ({
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

reducer.on(spotifyActions.getTopArtistsFail, (state, { timeRange, error }) => ({
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
 * concert data
 */
reducer.on(songkickActions.getConcertsStart, state => ({
  ...state,
  concerts: {
    value: null,
    isLoading: true,
    error: null,
  },
}));

reducer.on(songkickActions.getConcertsSuccess, (state, value) => ({
  ...state,
  concerts: {
    value,
    isLoading: false,
    error: null,
  },
}));

reducer.on(songkickActions.getConcertsFail, (state, error) => ({
  ...state,
  concerts: {
    value: null,
    isLoading: false,
    error,
  },
}));

/**
 * create playlist
 */
reducer.on(spotifyActions.createPlaylistStart, state => ({
  ...state,
  createPlaylist: {
    value: null,
    isLoading: true,
    error: null,
  },
}));

reducer.on(spotifyActions.createPlaylistSuccess, state => ({
  ...state,
  createPlaylist: {
    value: null,
    isLoading: false,
    error: null,
  },
}));

reducer.on(spotifyActions.createPlaylistFail, (state, error) => ({
  ...state,
  createPlaylist: {
    value: null,
    isLoading: false,
    error,
  },
}));

export default reducer;

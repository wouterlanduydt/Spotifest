import { createReducer } from 'redux-act';
import { spotifyActions, songkickActions } from './actions';
import { Event } from 'types/songkick';
import { TExtendedArtist, TPosterMeta } from 'types/general';

export interface IState {
  user: {
    value: SpotifyApi.UserObjectPrivate | null;
    isLoading: boolean;
    error: Error | null;
  };
  artists: {
    value: TExtendedArtist[];
    isLoading: boolean;
    error: Error | null;
  };
  posterMeta: {
    value: TPosterMeta | null;
    isLoading: boolean;
    error: Error | null;
  };
  createPlaylist: {
    value: SpotifyApi.CreatePlaylistResponse | null;
    isLoading: boolean;
    error: Error | null;
  };
  concerts: {
    value: { [name: string]: Event[] } | null;
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
    value: [],
    isLoading: false,
    error: null,
  },
  posterMeta: {
    value: null,
    isLoading: false,
    error: null,
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
reducer.on(spotifyActions.getTopArtistsStart, state => ({
  ...state,
  artists: {
    value: [],
    isLoading: true,
    error: null,
  },
}));

reducer.on(spotifyActions.getTopArtistsSuccess, (state, value) => ({
  ...state,
  artists: {
    value,
    isLoading: false,
    error: null,
  },
}));

reducer.on(spotifyActions.getTopArtistsFail, (state, error) => ({
  ...state,
  artists: {
    value: [],
    isLoading: false,
    error,
  },
}));

/**
 * poster meta
 */
reducer.on(spotifyActions.getPosterMetaStart, state => ({
  ...state,
  posterMeta: {
    value: null,
    isLoading: true,
    error: null,
  },
}));

reducer.on(spotifyActions.getPosterMetaSuccess, (state, value) => ({
  ...state,
  posterMeta: {
    value,
    isLoading: false,
    error: null,
  },
}));

reducer.on(spotifyActions.getPosterMetaFail, (state, error) => ({
  ...state,
  posterMeta: {
    value: null,
    isLoading: false,
    error,
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

reducer.on(spotifyActions.createPlaylistSuccess, (state, value) => ({
  ...state,
  createPlaylist: {
    value,
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

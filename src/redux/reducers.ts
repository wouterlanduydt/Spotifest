import { createReducer } from 'redux-act';
import { spotifyActions } from './actions';
import { TExtendedArtist } from 'types/general';

export interface IState {
  user: {
    value?: SpotifyApi.UserObjectPrivate;
    isLoading: boolean;
    error?: Error;
  };
  artists: {
    value: TExtendedArtist[];
    isLoading: boolean;
    error?: Error;
  };
}

const initialState = {
  user: {
    value: undefined,
    isLoading: false,
    error: undefined,
  },
  artists: {
    value: [],
    isLoading: false,
    error: undefined,
  },
};

const reducer = createReducer<IState>({}, initialState);

/**
 * user details
 */
reducer.on(spotifyActions.getUserDetailsStart, state => ({
  ...state,
  user: {
    value: undefined,
    isLoading: true,
    error: undefined,
  },
}));

reducer.on(spotifyActions.getUserDetailsSuccess, (state, value) => ({
  ...state,
  user: {
    value,
    isLoading: false,
    error: undefined,
  },
}));

reducer.on(spotifyActions.getUserDetailsFail, (state, error) => ({
  ...state,
  user: {
    value: undefined,
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
    error: undefined,
  },
}));

reducer.on(spotifyActions.getTopArtistsSuccess, (state, value) => ({
  ...state,
  artists: {
    value,
    isLoading: false,
    error: undefined,
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

export default reducer;

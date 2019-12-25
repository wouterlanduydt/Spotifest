import { createReducer } from 'redux-act';
import { spotifyActions } from './actions';
import { TExtendedArtist } from 'types/general';

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

export default reducer;

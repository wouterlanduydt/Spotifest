import { IState } from './reducers';

export const getArtistConcerts = (state: IState, artist: string) =>
  state.concerts.value && state.concerts.value[artist];

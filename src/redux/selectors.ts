import { IState } from './reducers';
import { TExtendedArtist } from 'types/general';

export const getArtists = (state: IState): TExtendedArtist[] => state.artists.value;

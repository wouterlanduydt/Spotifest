export enum ETimeRange {
  long = 'long_term',
  medium = 'medium_term',
  short = 'short_term',
}

export type TExtendedArtist = SpotifyApi.ArtistObjectFull & { time_range: ETimeRange };

export const distances = [
  {
    value: 50,
    label: '50km',
  },
  {
    value: 100,
    label: '100km',
  },
  {
    value: 250,
    label: '250km',
  },
  {
    value: 500,
    label: '500km',
  },
  {
    value: 1000,
    label: '1000km',
  },
];

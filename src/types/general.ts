export enum ETimeRange {
  long_term = 'long_term',
  medium_term = 'medium_term',
  short_term = 'short_term',
}

export type TExtendedArtist = SpotifyApi.ArtistObjectFull & { time_range: ETimeRange };

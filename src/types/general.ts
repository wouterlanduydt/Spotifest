export type TArtist = {
  name: string;
  importance: number;
  link: string;
};

export enum ETimeRange {
  short = 'short_term',
  medium = 'medium_term',
  long = 'long_term',
}

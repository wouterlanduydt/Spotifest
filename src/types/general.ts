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

export enum ESortCriteria {
  calculated = 'calculated',
  popularity = 'popularity',
  followers = 'followers',
  alphabetically = 'alphabetically',
}

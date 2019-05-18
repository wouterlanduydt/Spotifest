export type TArtist = {
  name: string;
  importance: number;
  link: string;
};

export enum ETimeRange {
  short = 'short_term',
  medium = 'medium_term',
  long = 'long_term',
  // short = 'Last 4 Weeks',
  // medium = 'Last 6 Months',
  // long = 'All Time',
}

export enum ESortCriteria {
  calculated = 'Personal Taste',
  popularity = 'Popularity',
  followers = 'Followers',
  alphabetically = 'Alphabetically',
}

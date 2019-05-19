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
  calculated = 'Personal Taste',
  popularity = 'Popularity',
  followers = 'Followers',
  alphabetically = 'Alphabetically',
}

export const timeRanges = [
  {
    value: ETimeRange.short,
    label: 'Last 4 Weeks',
  },
  {
    value: ETimeRange.medium,
    label: 'Last 6 Months',
  },
  {
    value: ETimeRange.long,
    label: 'All Time',
  },
];

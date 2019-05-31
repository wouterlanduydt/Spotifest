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

export const timeRanges = [
  {
    value: ETimeRange.short,
    label: 'Short Term',
  },
  {
    value: ETimeRange.medium,
    label: 'Medium Term',
  },
  {
    value: ETimeRange.long,
    label: 'Long Term',
  },
];

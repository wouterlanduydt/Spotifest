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

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

export const distances = {
  50: {
    value: 50,
    label: 'around the corner',
  },
  100: {
    value: 100,
    label: '100km',
  },
  250: {
    value: 250,
    label: '250km',
  },
  500: {
    value: 500,
    label: '500km',
  },
  1000: {
    value: 1000,
    label: '1000km',
  },
};

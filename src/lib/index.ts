import { IState } from 'redux/reducers';
import { TExtendedArtist, ETimeRange } from 'types/general';

export * from './music';

export const isRunningLocally = window.location.href.includes('localhost');

export const getUnique = (arr: any[], comp: string) =>
  arr
    .map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e as number])
    .map(e => arr[e as number]);

export const getAverage = (arr: number[]) => arr.reduce((p, c) => p + c, 0) / arr.length;

export const getMedian = (arr: number[]) => {
  const mid = Math.floor(arr.length / 2);
  const nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

export const getRandomNumber = (min: number, max: number) =>
  Math.floor(min + Math.random() * (max + 1 - min));

export const getSeparatorIndexes = (artists: TExtendedArtist[]) => {
  const getLastItemForRange = (time_range: ETimeRange) =>
    artists.filter(artist => artist.time_range === time_range).length;

  const long = getLastItemForRange(ETimeRange.long);
  const medium = getLastItemForRange(ETimeRange.medium) + long;

  return [long, medium];
};

export const getUserLocation = (options?: PositionOptions): Promise<Position> =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options),
  );

export const filterConcertsByDistance = (
  concerts: IState['concerts'],
  userCoords: Position['coords'] | undefined,
  range: number,
): IState['concerts'] => {
  if (concerts.value && userCoords) {
    const newVal: IState['concerts']['value'] = {};

    Object.keys(concerts.value).forEach(artist => {
      newVal[artist] = concerts.value![artist].filter(concert => {
        const ky = 40000 / 360;
        const kx = Math.cos((Math.PI * userCoords.latitude) / 180.0) * ky;
        const dx = Math.abs(userCoords.longitude - concert.location.lng) * kx;
        const dy = Math.abs(userCoords.latitude - concert.location.lat) * ky;
        return Math.sqrt(dx * dx + dy * dy) <= range;
      });
    });

    return {
      ...concerts,
      value: newVal,
    };
  }

  return concerts;
};

export const colorDuos = [
  {
    light: [170, 13, 37], // rgb(170, 13, 37)
    dark: [15, 22, 45], // rgb(15, 22, 45)
  },
  {
    light: [59, 175, 74], // rgb(59, 175, 74)
    dark: [0, 0, 81], // rgb(0, 0, 81)
  },
  {
    light: [181, 138, 45], // rgb(181, 138, 45)
    dark: [48, 14, 9], // rgb(48, 14, 9)
  },
  {
    light: [188, 52, 100], // rgb(188, 52, 100)
    dark: [17, 36, 94], // rgb(17, 36, 94)
  },
  {
    light: [42, 84, 191], // rgb(42, 84, 191)
    dark: [20, 23, 30], // rgb(20, 23, 30)
  },
  {
    light: [186, 9, 32], // rgb(186, 9, 32)
    dark: [0, 0, 0], // rgb(0,0,0)
  },
  {
    light: [113, 142, 102], // rgb(113, 142, 102)
    dark: [66, 23, 59], // rgb(41, 9, 0)
  },
  {
    light: [191, 0, 127], // rgb(191, 0, 127)
    dark: [23, 31, 81], // rgb(23, 31, 81)
  },
  {
    light: [163, 101, 116], // rgb(163, 101, 116)
    dark: [23, 58, 71], // rgb(23, 58, 71)
  },
  {
    light: [122, 122, 51], // rgb(122, 122, 51)
    dark: [37, 12, 37], // rgb(37, 12, 37)
  },
  {
    light: [24, 105, 150], // rgb(24, 105, 150)
    dark: [56, 15, 15], // rgb(56, 15, 15)
  },
  {
    light: [140, 79, 39], // rgb(140, 79, 39)
    dark: [29, 29, 52], // rgb(29, 29, 52)
  },
];

export const getRandomColorDuo = () => colorDuos[getRandomNumber(0, colorDuos.length - 1)];

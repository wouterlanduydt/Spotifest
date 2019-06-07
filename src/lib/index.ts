import { IState } from 'redux/reducers';
import { TExtendedArtist, ETimeRange } from 'types/general';

export const isRunningLocally = window.location.href.includes('localhost');

export const getUnique = (arr: any[], comp: string) =>
  arr
    .map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e as number])
    .map(e => arr[e as number]);

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

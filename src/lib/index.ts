import { IState } from 'redux/reducers';

export const isRunningLocally = window.location.href.includes('localhost');

export const getUnique = (arr: any[], comp: string) =>
  arr
    .map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e as number])
    .map(e => arr[e as number]);

export const getHeadlinerAmt = (total: number) => {
  const topArtists = Math.round((total / 100) * 20);
  const midArtists = Math.round((total / 100) * 40) + topArtists;

  return [topArtists, midArtists];
};

export const isMidArtist = (pos: number, total: number) => {
  const [topArtists, midArtists] = getHeadlinerAmt(total);
  return pos > topArtists && pos <= midArtists;
};

export const isTopArtist = (pos: number, total: number) => {
  const [topArtists] = getHeadlinerAmt(total);
  return pos <= topArtists;
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
      newVal[artist] = concerts.value![artist].filter((concert: any) => {
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

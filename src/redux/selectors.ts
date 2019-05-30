import { IState } from './reducers';

// const isEventNear = (coordinates: { longitude: number; latitude: number }, rangeInKm: number) => {
//   let longitude = 0;
//   let latitude = 0;

//   // TODO: fix getting current location
//   window.navigator.geolocation.getCurrentPosition(location => {
//     longitude = location.coords.longitude;
//     latitude = location.coords.latitude;
//   });
//   const ky = 40000 / 360;
//   const kx = Math.cos((Math.PI * latitude) / 180.0) * ky;
//   const dx = Math.abs(longitude - coordinates.longitude) * kx;
//   const dy = Math.abs(latitude - coordinates.latitude) * ky;
//   return Math.sqrt(dx * dx + dy * dy) <= rangeInKm;
// };

export const getArtistConcerts = (state: IState, artist: string) =>
  state.concerts.value && state.concerts.value[artist];

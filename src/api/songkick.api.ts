import { format as formatDate, addMonths } from 'date-fns';
import Songkick from 'songkick-js';

const songkick = new Songkick(process.env.REACT_APP_SONGKICK_API_KEY, true);

const SONGKICK_DATE_FORMAT = 'YYYY-MM-dd';

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

const dateParseOptions = {
  awareOfUnicodeTokens: true,
};

export const getEventsByArtist = (artist_name: string) =>
  songkick.searchEvents({
    searchBy: {
      artist_name,
    },
    optionalParams: {
      page: 1,
      per_page: 100,
      min_date: formatDate(new Date(), SONGKICK_DATE_FORMAT, dateParseOptions),
      max_date: formatDate(addMonths(new Date(), 24), SONGKICK_DATE_FORMAT, dateParseOptions),
    },
  });

import { format as formatDate, addMonths } from 'date-fns';
import Songkick from 'songkick-js';

const songkick = new Songkick(process.env.REACT_APP_SONGKICK_API_KEY, true);

export const SONGKICK_DATE_FORMAT = 'yyyy-MM-dd';

export const getEventsByArtist = (artist_name: string) =>
  songkick.searchEvents({
    searchBy: {
      artist_name: encodeURIComponent(artist_name),
    },
    optionalParams: {
      page: 1,
      per_page: 100,
      min_date: formatDate(new Date(), SONGKICK_DATE_FORMAT),
      max_date: formatDate(addMonths(new Date(), 24), SONGKICK_DATE_FORMAT),
    },
  });

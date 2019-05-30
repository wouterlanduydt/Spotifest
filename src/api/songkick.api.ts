import { format as formatDate, addMonths } from 'date-fns';
import Songkick from 'songkick-js';

const songkick = new Songkick(process.env.REACT_APP_SONGKICK_API_KEY, true);

const SONGKICK_DATE_FORMAT = 'YYYY-MM-dd';

const dateParseOptions = {
  awareOfUnicodeTokens: true,
};

export const getEventsByArtist = (artist_name: string) =>
  songkick.searchEvents({
    searchBy: {
      artist_name: encodeURIComponent(artist_name),
    },
    optionalParams: {
      page: 1,
      per_page: 100,
      min_date: formatDate(new Date(), SONGKICK_DATE_FORMAT, dateParseOptions),
      max_date: formatDate(addMonths(new Date(), 24), SONGKICK_DATE_FORMAT, dateParseOptions),
    },
  });

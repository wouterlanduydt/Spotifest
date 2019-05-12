export type TTopArtistsResponse = {
  items: TArtistItem[];
  total: number;
  limit: number;
  offset: number;
  previous?: string;
  href: string;
  next?: string;
};

type TArtistItem = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href?: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

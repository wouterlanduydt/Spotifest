import { ESortCriteria } from 'types/general';

export const isRunningLocally = window.location.href.includes('localhost');

export const getSortedArtists = (
  artistsValue: SpotifyApi.ArtistObjectFull[],
  sortCriteria: ESortCriteria,
) => {
  switch (sortCriteria) {
    case ESortCriteria.popularity:
      return [...artistsValue].sort((a, b) => b.popularity - a.popularity);

    case ESortCriteria.followers:
      return [...artistsValue].sort((a, b) => b.followers.total - a.followers.total);

    case ESortCriteria.alphabetically:
      return [...artistsValue].sort((a, b) => a.name.localeCompare(b.name));

    default:
      return artistsValue;
  }
};

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

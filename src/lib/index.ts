import { ESortCriteria } from 'types/general';

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

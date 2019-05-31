export const isRunningLocally = window.location.href.includes('localhost');

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

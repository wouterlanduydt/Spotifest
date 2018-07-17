const getMostCommonGenre = genres => {
  const flattenedGenres = [].concat(...genres);
  const mostCommonGenre = flattenedGenres
    .sort(
      (a, b) =>
        flattenedGenres.filter(genre => genre === a).length -
        flattenedGenres.filter(genre => genre === b).length
    )
    .pop();

  return mostCommonGenre;
};

export default getMostCommonGenre;

const getArtistImportance = position => {
  if (position <= 3) {
    return 1;
  } else if (position > 1 && position <= 20) {
    return 2;
  } else if (position > 20) {
    return 3;
  }
};

export default getArtistImportance;

import genres from "../assets/data/genres";

const getGenreGroup = props => {
  for (let i = 0; i < genres.length; i++) {
    if (genres[i].includes(props.mostCommonGenre)) {
      return i;
    }
    return 0;
  }
};

export default getGenreGroup;

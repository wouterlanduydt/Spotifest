import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ArtistSection from "./ArtistSection";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 500px;
`;

const Poster = styled.div`
  height: 0;
  margin-top: 16px;
  padding-top: calc(1300 / 1000 * 100%);
  position: relative;
`;

const PosterInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props =>
    props.theme.genreColors[props.genreGroup].background};
`;

const List = styled.ol`
  width: 100%;
  height: 100%;
  padding: 16px;
`;

const ArtistList = ({ artists, genreGroup }) => {
  const sections = [];

  for (let i = 1; i <= 3; i++) {
    sections.push(
      <ArtistSection
        genreGroup={genreGroup}
        key={i}
        artists={artists.filter(artist => artist.importance === i)}
      />
    );
  }

  return (
    <Wrapper>
      <Poster>
        <PosterInner genreGroup={genreGroup}>
          <List>{sections}</List>
        </PosterInner>
      </Poster>
    </Wrapper>
  );
};

ArtistList.propTypes = {
  artists: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      importance: PropTypes.number.isRequired
    })
  ),
  genreGroup: PropTypes.number.isRequired
};

export default ArtistList;

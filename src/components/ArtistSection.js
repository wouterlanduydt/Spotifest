import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ArtistItem from "./ArtistItem";

const Wrapper = styled.div`
  &:nth-child(1) {
    margin-bottom: 24px;
  }

  &:nth-child(2) {
    margin-bottom: 16px;
  }
`;

const ArtistList = styled.ol`
  display: flex;
  flex-wrap: wrap;
`;

const ArtistSection = ({ artists, genreGroup }) => (
  <Wrapper>
    <ArtistList>
      {artists.map((artist, i) => (
        <ArtistItem
          genreGroup={genreGroup}
          key={artist.name}
          link={artist.link}
          name={artist.name}
          importance={artist.importance}
        />
      ))}
    </ArtistList>
  </Wrapper>
);

ArtistSection.propTypes = {
  artists: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      importance: PropTypes.number.isRequired
    })
  ),
  genreGroup: PropTypes.number.isRequired
};

export default ArtistSection;

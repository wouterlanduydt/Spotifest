import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ArtistItem from "./ArtistItem";

const ArtistList = styled.ol`
  display: flex;
  flex-wrap: wrap;
`;

const ArtistSection = ({ artists }) => (
  <li>
    <ArtistList>
      {artists.map((artist, i) => (
        <ArtistItem
          key={artist.name}
          link={artist.link}
          name={artist.name}
          importance={artist.importance}
        />
      ))}
    </ArtistList>
  </li>
);

ArtistSection.propTypes = {
  artists: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      importance: PropTypes.number.isRequired
    })
  )
};

export default ArtistSection;

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ArtistItem from "./ArtistItem";

const calculateImportance = position => {
  if (position <= 1) {
    return 1;
  } else if (position > 1 && position <= 20) {
    return 2;
  } else if (position > 20) {
    return 3;
  }
};

const List = styled.ol`
  max-width: 600px;
  margin: auto;
  margin-top: 40px;
  background-color: black;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 24px;
`;

const ArtistList = ({ artists }) => (
  <List>
    {artists.map((artist, i) => (
      <ArtistItem
        key={artist.name}
        link={artist.link}
        name={artist.name}
        importance={calculateImportance(i)}
      />
    ))}
  </List>
);

ArtistList.propTypes = {
  artists: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    })
  )
};

export default ArtistList;

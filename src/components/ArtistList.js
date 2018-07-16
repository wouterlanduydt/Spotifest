import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ArtistSection from "./ArtistSection";

const List = styled.ol`
  max-width: 600px;
  margin: auto;
  margin-top: 40px;
  background-color: black;
  padding: 24px;
`;

const ArtistList = ({ artists }) => {
  const sections = [];

  for (let i = 0; i <= 3; i++) {
    sections.push(
      <ArtistSection
        key={i}
        artists={artists.filter(artist => artist.importance === i)}
      />
    );
  }

  return <List>{sections}</List>;
};

ArtistList.propTypes = {
  artists: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      importance: PropTypes.number.isRequired
    })
  )
};

export default ArtistList;

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ArtistSection from "./ArtistSection";
import DuoToneFilter from "../styles/DuoToneFilter";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.constants.posterWidth};
`;

const Poster = styled.div`
  height: 0;
  padding-top: calc(1300 / 1000 * 100%);
  position: relative;
`;

const PosterInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  @media (min-width: ${props => props.theme.constants.posterWidth}) {
    margin-top: 24px;
    box-shadow: 0px 4px 16px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Image = styled.div`
  position: absolute;
  opacity: 0.7;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => `url(${props.image}) center no-repeat`};
  background-size: cover;
  -webkit-filter: url(#peachy);
  -moz-filter: url(#peachy);
  -o-filter: url(#peachy);
  -ms-filter: url(#peachy);
  filter: url(#peachy);
`;

const List = styled.ol`
  position: relative;
  z-index: 99;
  width: 100%;
  height: 100%;
  padding: 16px;
`;

const ArtistList = ({ artists, profilePictureUrl }) => {
  const sections = [];

  for (let i = 1; i <= 3; i++) {
    sections.push(
      <ArtistSection
        key={i}
        artists={artists.filter(artist => artist.importance === i)}
      />
    );
  }

  return (
    <Wrapper>
      <Poster>
        <PosterInner>
          <List>{sections}</List>
          <Image image={profilePictureUrl} />
          <DuoToneFilter />
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
  profilePictureUrl: PropTypes.string.isRequired
};

export default ArtistList;

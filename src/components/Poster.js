import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ArtistSection from "./ArtistSection";
import Title from "./Title";
import DuoToneFilter from "../styles/DuoToneFilter";
import SpotifyLogo from "../assets/svg/spotify.svg";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 97vw;
  @media (min-width: 570px) {
    max-width: ${props => props.theme.constants.posterWidth};
  }
`;

const PosterWrapper = styled.div`
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
  box-shadow: 0px 4px 16px 8px rgba(0, 0, 0, 0.1);
  margin-top: 8px;

  @media (min-width: 570px) {
    margin-top: 24px;
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

const ContentWrapper = styled.div`
  position: relative;
  z-index: 99;
  width: 100%;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const Bottom = styled.div`
  position: relative;
  z-index: 99;
  margin-top: auto;
`;

const BottomLogo = styled.img`
  width: 20px;
`;

const Poster = ({ artists, profilePictureUrl }) => {
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
      <PosterWrapper>
        <PosterInner>
          <ContentWrapper>
            <Title title="Spotifest" />
            <div>{sections}</div>
            <Bottom>
              <a
                href="https://www.spotify.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BottomLogo src={SpotifyLogo} alt="" />
              </a>
            </Bottom>
          </ContentWrapper>
          <Image image={profilePictureUrl} />
          <DuoToneFilter />
        </PosterInner>
      </PosterWrapper>
    </Wrapper>
  );
};

Poster.propTypes = {
  artists: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      importance: PropTypes.number.isRequired
    })
  ),
  profilePictureUrl: PropTypes.string.isRequired
};

export default Poster;

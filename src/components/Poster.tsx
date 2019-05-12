import React from "react";
import styled, { css } from "styled-components";
import ArtistSection from "./ArtistSection";
import Title from "./Title";
import DuoToneFilter from "../styles/DuoToneFilter";
import SpotifyLogo from "../assets/svg/spotify.svg";
import { TArtist } from "types/general";
import { constants } from "styles/branding";

const getFilterColor = (color: string) =>
  css`
    -webkit-filter: url(${color});
    -moz-filter: url(${color});
    -o-filter: url(${color});
    -ms-filter: url(${color});
    filter: url(${color});
  `;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 96vw;
  @media (min-width: 570px) {
    max-width: ${constants.posterWidth};
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
  margin-top: 24px;
`;

const Image = styled.div<{ image: string; backgroundColor: string }>`
  position: absolute;
  opacity: 0.6;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ image }) => `url(${image}) center no-repeat`};
  background-color: ${({ backgroundColor }) => backgroundColor};
  background-size: cover;
  ${({ backgroundColor }) => getFilterColor(backgroundColor)};
  image-rendering: crisp-edges;
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

type TProps = {
  artists: TArtist[];
  profilePictureUrl: string;
  backgroundColor: string;
};

const Poster = ({ artists, profilePictureUrl, backgroundColor }: TProps) => {
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
              <a href="https://www.spotify.com" rel="noopener noreferrer">
                <BottomLogo src={SpotifyLogo} alt="" />
              </a>
            </Bottom>
          </ContentWrapper>
          <Image image={profilePictureUrl} backgroundColor={backgroundColor} />
          <DuoToneFilter />
        </PosterInner>
      </PosterWrapper>
    </Wrapper>
  );
};

export default Poster;

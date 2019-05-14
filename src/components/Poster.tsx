import React from 'react';
import styled from 'styled-components';
// import ArtistSection from './ArtistSection';
import Title from './Title';
import DuoToneFilter from '../styles/DuoToneFilter';
import SpotifyLogo from '../assets/svg/spotify.svg';
import { ESortCriteria } from 'types/general';
import { constants } from 'styles/branding';
import { TTopArtists } from 'redux/reducers';

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
  filter: ${({ backgroundColor }) => `url(${backgroundColor})`};
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
  artists: TTopArtists;
  profilePictureUrl: string;
  backgroundColor: string;
};

const Poster = ({ artists, profilePictureUrl, backgroundColor }: TProps) => {
  // const sections = [];

  // for (let i = 1; i <= 3; i++) {
  //   sections.push(
  //     <ArtistSection key={i} artists={artists.filter(artist => artist.importance === i)} />,
  //   );
  // }

  const [sortCriteria, setSortCriteria] = React.useState<ESortCriteria>(ESortCriteria.calculated);
  // TODO: move this to a util
  const getSortedArtists = (artistsValue: SpotifyApi.ArtistObjectFull[]) => {
    switch (sortCriteria) {
      case ESortCriteria.popularity:
        return [...artistsValue].sort((a, b) => b.popularity - a.popularity);

      case ESortCriteria.followers:
        return [...artistsValue].sort((a, b) => b.followers.total - a.followers.total);

      case ESortCriteria.alphabetically:
        return [...artistsValue].sort((a, b) => a.name.localeCompare(b.name));

      default:
        return artistsValue;
    }
  };

  return (
    <Wrapper>
      <PosterWrapper>
        <PosterInner>
          <ContentWrapper>
            <button onClick={() => setSortCriteria(ESortCriteria.popularity)}>popularity</button>
            <button onClick={() => setSortCriteria(ESortCriteria.followers)}>followers</button>
            <button onClick={() => setSortCriteria(ESortCriteria.calculated)}>calculated</button>
            <button onClick={() => setSortCriteria(ESortCriteria.alphabetically)}>
              alphabetically
            </button>
            <Title title="Spotifest" />
            <p>
              {JSON.stringify(artists.value && getSortedArtists(artists.value).map(i => i.name))}
            </p>
            {/* <div>{sections}</div> */}
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

export default React.memo(Poster);

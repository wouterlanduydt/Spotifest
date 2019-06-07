import React from 'react';
import Title from './Title';
// import SpotifyLogo from '../assets/svg/spotify.svg';
import ArtistItem from './ArtistItem';
import { getSeparatorIndexes } from 'lib';
import styled from 'styled-components';
import { LoadingIndicator } from 'components';
import { IState } from 'redux/reducers';
import { fadeIn } from 'styles/animations';

type TProps = {
  username: string | undefined | null;
  artists: IState['artists'];
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 96vw;
  height: 135vw;
  max-width: ${({ theme }) => theme.maxPoster}px;
  max-height: 900px;
  margin: 0 auto;
  padding: 8px;
  background: linear-gradient(45deg, #536976, #292e49);
  margin-top: 16px;
  border: 4px solid white;
`;

const ArtistsWrap = styled.ol`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Separator = styled.div<{ total: number }>`
  width: 100%;
  margin: 1.6vw 0 1.2vw;
  text-align: center;
  position: relative;
  opacity: 0;

  animation-fill-mode: forwards;
  animation-name: ${fadeIn};
  animation-duration: 400ms;
  animation-timing-function: ease-in-out;
  animation-delay: ${({ total }) => total * 5}ms;

  span {
    color: white;
    text-transform: uppercase;
    font-size: 2vw;

    display: flex;
    width: 80%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    text-align: center;

    &:before,
    &:after {
      content: '';
      border-top: 1px solid;
      margin: 0 8px 0 0;
      flex: 1 0 8px;
    }

    &:after {
      margin: 0 0 0 8px;
    }
  }

  @media (min-width: ${({ theme }) => theme.maxPoster}px) {
    margin: 12px 0 8px;

    span {
      font-size: 12px;
    }
  }
`;

const Poster = ({ artists, username }: TProps) => {
  const [long, medium] = getSeparatorIndexes(artists.value);

  return (
    <Wrap>
      <Title title="Spotifest" username={username} />
      {artists.isLoading && <LoadingIndicator style={{ marginTop: 24 }} />}
      <ArtistsWrap>
        {artists.value &&
          artists.value.map((artist, i) => (
            <React.Fragment key={artist.id}>
              {(i === 0 || i === long || i === medium) && (
                <Separator total={artists.value.length}>
                  <span>{i === 0 ? 'long term' : i === long ? 'medium term' : 'short term'}</span>
                </Separator>
              )}
              <ArtistItem artist={artist} position={i} key={`${artist.id}-${i}`} />
            </React.Fragment>
          ))}
      </ArtistsWrap>

      {/* <div>
        <a href="https://www.spotify.com" rel="noopener noreferrer">
        <img src={SpotifyLogo} alt="" />
        </a>
      </div> */}
    </Wrap>
  );
};

export default React.memo(Poster);

import React from 'react';
import Title from './Title';
// import SpotifyLogo from '../assets/svg/spotify.svg';
import ArtistItem from './ArtistItem';
import { getHeadlinerAmt } from 'lib';
import styled from 'styled-components';
import { LoadingIndicator } from 'components';
import { IState } from 'redux/reducers';

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

const Separator = styled.div`
  width: 100%;
  height: 2vw;

  @media (min-width: ${({ theme }) => theme.maxPoster}px) {
    height: 12px;
  }
`;

const Poster = ({ artists, username }: TProps) => (
  <Wrap>
    <Title title="Spotifest" username={username} />
    {artists.isLoading && <LoadingIndicator style={{ marginTop: 24 }} />}
    <ArtistsWrap>
      {artists.value &&
        artists.value.map((artist, i) => {
          const [topArtists, midArtists] = getHeadlinerAmt(artists.value!.length);

          return (
            <React.Fragment key={artist.id}>
              <ArtistItem artist={artist} position={i} key={`${artist.id}-${i}`} />
              {(i === topArtists || i === midArtists) && <Separator />}
            </React.Fragment>
          );
        })}
    </ArtistsWrap>

    {/* <div>
        <a href="https://www.spotify.com" rel="noopener noreferrer">
          <img src={SpotifyLogo} alt="" />
        </a>
      </div> */}
  </Wrap>
);

export default React.memo(Poster);

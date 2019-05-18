import React from 'react';
import Title from './Title';
import SpotifyLogo from '../assets/svg/spotify.svg';
import { ESortCriteria } from 'types/general';
import { TTopArtists } from 'redux/reducers';
import ArtistItem from './ArtistItem';
import { getSortedArtists, getHeadlinerAmt } from 'lib';
import styled from 'styled-components';

type TProps = {
  username: string | undefined | null;
  artists: TTopArtists;
  sortCriteria: ESortCriteria;
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 96vw;
  height: 135vw;
  max-width: 640px;
  max-height: 900px;
  margin: 0 auto;
  padding: 8px;
  background: linear-gradient(45deg, #536976, #292e49);
`;

const ArtistsWrap = styled.ol`
  display: flex;
  /* width: 100%; */
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
`;

const Poster = ({ artists, sortCriteria, username }: TProps) => {
  return (
    <Wrap>
      <Title title="Spotifest" username={username} />
      <ArtistsWrap>
        {artists.value &&
          getSortedArtists(artists.value, sortCriteria).map((artist, i) => {
            const [topArtists, midArtists] = getHeadlinerAmt(artists.value!.length);

            return (
              <React.Fragment key={artist.id}>
                <ArtistItem artist={artist} position={i} />
                {(i === topArtists || i === midArtists) && (
                  <div style={{ width: '100%', height: '2vw' }} />
                )}
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
};

export default React.memo(Poster);

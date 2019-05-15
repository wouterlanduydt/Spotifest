import React from 'react';
import Title from './Title';
import SpotifyLogo from '../assets/svg/spotify.svg';
import { ESortCriteria } from 'types/general';
import { TTopArtists } from 'redux/reducers';
import ArtistItem from './ArtistItem';
import { getSortedArtists } from 'lib';
import styled from 'styled-components';

type TProps = {
  username: string | undefined | null;
  artists: TTopArtists;
  sortCriteria: ESortCriteria;
};

const Wrap = styled.div`
  width: 96vw;
  max-width: 600px;
  min-height: 400px;
  margin: 0 auto;
  border: 2px solid black;
  padding: 16px;
`;

const ArtistsWrap = styled.ol`
  display: flex;
  width: 90%;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
`;

const Poster = ({ artists, sortCriteria, username }: TProps) => {
  return (
    <Wrap>
      <Title title={`${username}'s Spotifest`} />
      <ArtistsWrap>
        {artists.value &&
          getSortedArtists(artists.value, sortCriteria).map((artist, i) => (
            <ArtistItem key={artist.id} artist={artist} position={i} />
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

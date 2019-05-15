import React from 'react';
import Title from './Title';
import SpotifyLogo from '../assets/svg/spotify.svg';
import { ESortCriteria } from 'types/general';
import { TTopArtists } from 'redux/reducers';
import ArtistItem from './ArtistItem';
import { getSortedArtists } from 'lib';

type TProps = {
  username: string | undefined | null;
  artists: TTopArtists;
  sortCriteria: ESortCriteria;
};

const Poster = ({ artists, sortCriteria, username }: TProps) => {
  return (
    <div>
      <Title title={`${username}'s Spotifest`} />
      {artists.value &&
        getSortedArtists(artists.value, sortCriteria).map(artist => <ArtistItem artist={artist} />)}

      {/* <div>
        <a href="https://www.spotify.com" rel="noopener noreferrer">
          <img src={SpotifyLogo} alt="" />
        </a>
      </div> */}
    </div>
  );
};

export default React.memo(Poster);

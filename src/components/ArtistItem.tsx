import React from 'react';

type TProps = {
  artist: SpotifyApi.ArtistObjectFull;
};

const ArtistItem = ({ artist: { name, external_urls } }: TProps) => (
  <div>
    <a href={external_urls.spotify} rel="noopener noreferrer">
      {name}
    </a>
  </div>
);

export default ArtistItem;

import React from 'react';
import styled from 'styled-components';

type TProps = {
  artist: SpotifyApi.ArtistObjectFull;
  position: number;
};

const getFontSize = (pos: number) => {
  if (pos <= 12) return '2.8vw';
  if (pos > 12 && pos <= 26) return '2vw';
  if (pos > 26) return '1.8vw';
};

const Wrap = styled.li<{ position: number }>`
  margin: 4px;
  font-size: ${({ position }) => getFontSize(position)};
`;

const ArtistItem = ({ artist: { name, external_urls }, position }: TProps) => (
  <>
    <Wrap position={position}>
      <a href={external_urls.spotify} rel="noopener noreferrer">
        {name}
      </a>
    </Wrap>
    {(position === 12 || position === 26) && <div style={{ width: '100%' }} />}
  </>
);

export default ArtistItem;

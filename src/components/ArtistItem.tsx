import React from 'react';
import styled from 'styled-components';
import { isTopArtist, isMidArtist } from 'lib';

type TProps = {
  artist: SpotifyApi.ArtistObjectFull;
  position: number;
};

const getFontSize = (pos: number, total: number) => {
  if (isTopArtist(pos, total)) return '4.4vw';
  if (isMidArtist(pos, total)) return '3.8vw';
  return '3.4vw';
};

const Wrap = styled.li<{ position: number }>`
  margin: 0.6vw 1vw;
  font-size: ${({ position }) => getFontSize(position, 50)};
  font-weight: ${({ position }) => (position % 2 === 0 ? 800 : 500)};
  text-transform: uppercase;
`;

const Text = styled.a`
  text-decoration: none;
  color: white;
`;

const ArtistItem = ({ artist: { name, external_urls }, position }: TProps) => (
  <Wrap position={position}>
    <Text href={external_urls.spotify} rel="noopener noreferrer">
      {name}
    </Text>
  </Wrap>
);

export default ArtistItem;

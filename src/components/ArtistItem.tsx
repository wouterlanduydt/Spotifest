import React from 'react';
import styled, { keyframes } from 'styled-components';
import { isTopArtist, isMidArtist } from 'lib';

type TProps = {
  artist: SpotifyApi.ArtistObjectFull;
  position: number;
  isHighlighted: boolean;
};

const getFontSize = (pos: number, total: number, isMobile: boolean) => {
  if (isTopArtist(pos, total)) return isMobile ? '4.4vw' : '28px';

  if (isMidArtist(pos, total)) return isMobile ? '3.8vw' : '24px';
  return isMobile ? '3.4vw' : '22px';
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrap = styled.li<{ position: number }>`
  margin: 0.6vw 1vw;
  font-size: ${({ position }) => getFontSize(position, 50, true)};
  font-weight: ${({ position }) => (position % 2 === 0 ? 800 : 500)};
  text-transform: uppercase;
  opacity: 0;

  animation-fill-mode: forwards;
  animation-name: ${fadeIn};
  animation-duration: 200ms;
  animation-timing-function: ease-in-out;
  animation-delay: ${({ position }) => position * 5}ms;

  @media (min-width: ${({ theme }) => theme.maxPoster}px) {
    margin: 4px 6px;
    font-size: ${({ position }) => getFontSize(position, 50, false)};
  }
`;

const Text = styled.a<{ isHighlighted: boolean }>`
  display: inline-block;
  text-decoration: ${({ isHighlighted }) => (isHighlighted ? 'none' : 'line-through')};
  opacity: ${({ isHighlighted }) => (isHighlighted ? 1 : 0.4)};
  transition: opacity 400ms ease-in-out;
  color: white;
`;

const ArtistItem = ({ artist: { name, external_urls }, position, isHighlighted }: TProps) => {
  return (
    <Wrap position={position}>
      <Text href={external_urls.spotify} rel="noopener noreferrer" isHighlighted={isHighlighted}>
        {name}
      </Text>
    </Wrap>
  );
};

export default ArtistItem;

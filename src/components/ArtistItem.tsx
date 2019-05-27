import React from 'react';
import styled, { keyframes } from 'styled-components';
import { isTopArtist, isMidArtist } from 'lib';
import { connect } from 'react-redux';
import { getArtistConcerts } from 'redux/selectors';
import { IState } from 'redux/reducers';

type TProps = {
  artist: SpotifyApi.ArtistObjectFull;
  position: number;
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

const Text = styled.a<{ hasConcerts: boolean }>`
  display: inline-block;
  text-decoration: ${({ hasConcerts }) => (hasConcerts ? 'none' : 'line-through')};
  opacity: ${({ hasConcerts }) => (hasConcerts ? 1 : 0.4)};
  transition: opacity 400ms ease-in-out;
  color: white;
`;

const ArtistItem = ({
  artist: { name, external_urls },
  position,
  concerts,
}: TProps & { concerts: IState['concerts'][''] }) => {
  const hasConcerts = concerts.value !== null || concerts.isLoading;

  return (
    <Wrap position={position}>
      <Text href={external_urls.spotify} rel="noopener noreferrer" hasConcerts={hasConcerts}>
        {name}
      </Text>
    </Wrap>
  );
};

export default connect((state: IState, { artist }: TProps) => ({
  concerts: getArtistConcerts(state, artist.name),
}))(ArtistItem);

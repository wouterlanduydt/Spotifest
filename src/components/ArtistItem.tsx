import React from 'react';
import styled from 'styled-components';
import { TExtendedArtist, ETimeRange } from 'types/general';

type TProps = {
  artist: TExtendedArtist;
  position: number;
};

const getFontSize = (time_range: ETimeRange, isMobile: boolean) => {
  if (time_range === ETimeRange.long_term) return isMobile ? '3.2vw' : '20px';

  if (time_range === ETimeRange.medium_term) return isMobile ? '3vw' : '19px';
  return isMobile ? '2.8vw' : '18px';
};

const Wrap = styled.li<{ position: number; time_range: ETimeRange }>`
  margin: 0.4vw 0.8vw;
  font-size: ${({ time_range }) => getFontSize(time_range, true)};
  font-weight: ${({ position }) => (position % 2 === 0 ? 700 : 500)};
  text-transform: uppercase;

  @media (min-width: ${({ theme }) => theme.maxPoster}px) {
    margin: 4px 6px;
    font-size: ${({ time_range }) => getFontSize(time_range, false)};
  }
`;

const Text = styled.a`
  display: inline-block;
  text-decoration: none;
  color: white;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

export const ArtistItem: React.FC<TProps> = ({
  artist: { name, external_urls, time_range },
  position,
}) => (
  <Wrap position={position} time_range={time_range}>
    <Text href={external_urls.spotify} rel="noopener noreferrer">
      {name}
    </Text>
  </Wrap>
);

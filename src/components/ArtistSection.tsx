import React from "react";
import styled from "styled-components";
import ArtistItem from "./ArtistItem";
import { TArtist } from "types/general";

const Wrapper = styled.div`
  &:nth-child(1) {
    margin-bottom: 16px;
    @media (min-width: 460px) {
      margin-bottom: 24px;
    }
  }

  &:nth-child(2) {
    margin-bottom: 8px;
    @media (min-width: 460px) {
      margin-bottom: 16px;
    }
  }
`;

const ArtistList = styled.ol`
  display: flex;
  flex-wrap: wrap;
`;

type TProps = {
  artists: TArtist[];
};

const ArtistSection = ({ artists }: TProps) => (
  <Wrapper>
    <ArtistList>
      {artists.map(artist => (
        <ArtistItem
          key={artist.name}
          link={artist.link}
          name={artist.name}
          importance={artist.importance}
        />
      ))}
    </ArtistList>
  </Wrapper>
);

export default ArtistSection;

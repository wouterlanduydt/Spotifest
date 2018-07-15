import React from "react";
import styled from "styled-components";
import ArtistItem from "./ArtistItem";

const List = styled.ol`
  max-width: 600px;
  margin: auto;
  margin-top: 40px;
  background-color: black;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 24px;
`;

const ArtistList = ({ artists }) => (
  <List>
    {artists.map((artist, i) => (
      <ArtistItem
        key={artist.name}
        link={artist.link}
        name={artist.name}
        position={i}
      />
    ))}
  </List>
);

export default ArtistList;

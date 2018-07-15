import React from "react";
import styled from "styled-components";

const calculateFontSize = position => {
  // if (position <= 1) {
  //   return "6.0em";
  // } else if (position > 1 && position <= 20) {
  //   return "3.0em";
  // } else if (position > 20) {
  //   return "2.0em";
  // }
  return "3.0em";
};

const Wrapper = styled.li`
  :not(:last-child) {
    margin-right: 16px;
  }
`;

const ArtistLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: ${props => calculateFontSize(props.position)};
`;

const ArtistItem = ({ name, link, position }) => (
  <Wrapper>
    <ArtistLink position={position} href={link}>
      {name}
    </ArtistLink>
  </Wrapper>
);

export default ArtistItem;

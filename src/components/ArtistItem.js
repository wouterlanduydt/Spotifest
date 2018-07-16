import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const calculateFontSize = importance => {
  switch (importance) {
    case 1:
      return "5.0em";
    case 2:
      return "2.6em";
    case 3:
      return "2.0em";
    default:
      return "2.0em";
  }
};

const Wrapper = styled.li`
  :not(:last-child) {
    margin-right: 16px;
  }
`;

const ArtistLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: ${props => calculateFontSize(props.importance)};
`;

const ArtistItem = ({ name, link, importance }) => (
  <Wrapper>
    <ArtistLink importance={importance} href={link}>
      {name}
    </ArtistLink>
  </Wrapper>
);

ArtistItem.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  importance: PropTypes.number.isRequired
};

export default ArtistItem;

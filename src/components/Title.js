import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.header`
  position: relative;
  z-index: 99;
  margin: 8px 0 16px;

  @media (min-width: 460px) {
    margin: 24px 0 24px;
  }
`;

const StyledTitle = styled.h1`
  padding: 4px 8px;
  font-size: 4.8vw;
  font-weight: 800;
  text-transform: uppercase;
  display: inline-block;
  background-color: white;
  @media (min-width: ${props => props.theme.constants.posterWidth}) {
    padding: 8px 16px;
    font-size: 2.8em;
  }
`;

const Title = ({ title }) => (
  <Wrapper>
    <StyledTitle>{title}</StyledTitle>
  </Wrapper>
);

Title.propTypes = {
  title: PropTypes.string
};

export default Title;

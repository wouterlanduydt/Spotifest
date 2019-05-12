import React from "react";
import styled from "styled-components";
import { constants } from "styles/branding";

const Wrapper = styled.header`
  position: relative;
  z-index: 99;
  margin: 8px 0 16px;

  @media (min-width: 460px) {
    margin: 24px 0 24px;
  }
`;

const StyledTitle = styled.h1`
  padding: 10px 16px;
  font-size: 3.6vw;
  font-weight: 600;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  display: inline-block;
  border: 2px solid white;
  color: white;

  @media (min-width: ${constants.posterWidth}) {
    padding: 12px 24px;
    font-size: 2em;
  }
`;

type TProps = {
  title: string;
};

const Title = ({ title }: TProps) => (
  <Wrapper>
    <StyledTitle>{title}</StyledTitle>
  </Wrapper>
);

export default Title;

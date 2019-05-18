import React from 'react';
import styled from 'styled-components';

type TProps = {
  title: string;
};

const StyledTitle = styled.h1`
  font-size: 26px;
  color: red;
  font-weight: 900;
`;

const Title = ({ title }: TProps) => <StyledTitle>{title}</StyledTitle>;

export default Title;

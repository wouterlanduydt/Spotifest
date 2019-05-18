import React from 'react';
import styled from 'styled-components';

type TProps = {
  title: string;
  username: string | undefined | null;
};

const Wrap = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;
  margin: 4vw 0;
`;

const SubTitle = styled.span`
  font-size: 2.4vw;
  color: white;
  z-index: 1;
  font-weight: 600;
`;

const StyledTitle = styled.h1`
  font-size: 6vw;
  color: white;
  font-weight: 900;
`;

const Title = ({ title, username }: TProps) => (
  <Wrap>
    {username && <SubTitle>{username}'s</SubTitle>}
    <StyledTitle>{title}</StyledTitle>
  </Wrap>
);

export default Title;

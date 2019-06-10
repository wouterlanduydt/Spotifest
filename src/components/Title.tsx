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
  margin: 4vw 0 2vw;

  @media (min-width: ${({ theme }) => theme.maxPoster}px) {
    margin: 32px 0 16px;
  }
`;

const SubTitle = styled.span`
  font-size: 2vw;
  color: white;
  z-index: 1;
  font-weight: 600;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);

  @media (min-width: ${({ theme }) => theme.maxPoster}px) {
    font-size: 16px;
  }
`;

const StyledTitle = styled.h1`
  font-size: 6vw;
  color: white;
  font-weight: 800;
  text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);

  @media (min-width: ${({ theme }) => theme.maxPoster}px) {
    font-size: 50px;
  }
`;

const Title = ({ title, username }: TProps) => (
  <Wrap>
    {username && <SubTitle>{username}'s</SubTitle>}
    <StyledTitle>{title}</StyledTitle>
  </Wrap>
);

export default React.memo(Title);

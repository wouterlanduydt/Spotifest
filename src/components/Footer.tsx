import React from 'react';
import styled from 'styled-components';
import { author, repository, version } from '../../package.json';

const StyledFooter = styled.footer`
  margin-top: 56px;
  display: flex;
  justify-content: center;
  font-size: 1.2em;
  position: relative;
  z-index: 99;
`;

const Link = styled.a<{ color: string }>`
  color: ${({ color }) => color};
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

type TProps = {
  color: string;
};

const Footer = ({ color }: TProps) => {
  const link = (text: string, url: string) => (
    <Link href={url} color={color} rel="noopener noreferrer">
      {text}
    </Link>
  );

  return (
    <StyledFooter>
      <span>
        Made by {link(author.name, author.url)} - {link('view source', repository)} - {version}
      </span>
    </StyledFooter>
  );
};

export default React.memo(Footer);

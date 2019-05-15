import React from 'react';
import styled from 'styled-components';
import { author, repository, version } from '../../package.json';

const StyledFooter = styled.footer`
  font-size: 1.2em;
`;

const Link = styled.a`
  color: #1fc14a;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

type TProps = {};

const Footer = ({  }: TProps) => {
  const link = (text: string, url: string) => (
    <Link href={url} rel="noopener noreferrer">
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

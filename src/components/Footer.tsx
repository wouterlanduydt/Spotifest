import React from 'react';
import styled from 'styled-components';
import { author, version } from '../../package.json';

const StyledFooter = styled.footer`
  font-size: 1.2em;
  margin: 8px auto 32px;
  width: 100%;
  text-align: center;
  color: white;
`;

const Link = styled.a`
  color: white;
  font-weight: 600;
  text-decoration: underline;
`;

const Footer = () => (
  <StyledFooter>
    Made by{' '}
    <Link href={author.url} rel="noopener noreferrer">
      {author.name}
    </Link>{' '}
    - v{version}
  </StyledFooter>
);

export default React.memo(Footer);

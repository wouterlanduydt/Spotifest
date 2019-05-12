import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  margin-top: 56px;
  display: flex;
  justify-content: center;
  font-size: 1.2em;
  position: relative;
  z-index: 99;
`;

const Link = styled.a`
  color: ${props => props.color};
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

type TProps = {
  name: string;
  websiteLink: string;
  sourceLink: string;
  color: string;
};

const Footer = ({ name, websiteLink, sourceLink, color }: TProps) => (
  <StyledFooter>
    <span>
      Made by{" "}
      <Link
        color={color}
        href={websiteLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {name}
      </Link>{" "}
      -{" "}
      <Link
        color={color}
        href={sourceLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        view source
      </Link>
    </span>
  </StyledFooter>
);

export default Footer;

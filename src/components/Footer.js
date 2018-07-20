import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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
`;

const Footer = ({ name, websiteLink, sourceLink, color }) => (
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

Footer.propTypes = {
  name: PropTypes.string.isRequired,
  websiteLink: PropTypes.string.isRequired,
  sourceLink: PropTypes.string.isRequired
};

export default Footer;

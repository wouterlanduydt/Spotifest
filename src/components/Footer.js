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

const Footer = ({ name, websiteLink, sourceLink }) => (
  <StyledFooter>
    <span>
      Made by{" "}
      <a href={websiteLink} target="_blank" rel="noopener noreferrer">
        {name}
      </a>{" "}
      -{" "}
      <a href={sourceLink} target="_blank" rel="noopener noreferrer">
        view source
      </a>
    </span>
  </StyledFooter>
);

Footer.propTypes = {
  name: PropTypes.string.isRequired,
  websiteLink: PropTypes.string.isRequired,
  sourceLink: PropTypes.string.isRequired
};

export default Footer;

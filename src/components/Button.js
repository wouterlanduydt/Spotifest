import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  background-color: #1fc14a;
  color: white;
  font-size: 1.8em;
  font-weight: 600;

  &:hover {
    cursor: pointer;
  }
`;

const Button = ({ onButtonClick, text }) => (
  <StyledButton onClick={onButtonClick}>{text}</StyledButton>
);

Button.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default Button;

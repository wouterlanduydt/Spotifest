import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 0;
`;

const Button = styled.button`
  border: ${props =>
    props.isSelected ? "2px solid rgba(0, 0, 0, 0.8)" : "none"};
  width: 24px;
  height: 24px;
  background-color: ${props => props.colorValue};
  border-radius: 50%;
  padding: 2px;
  background-clip: content-box;
  transition: border 50ms ease-in-out;

  &:not(:last-child) {
    margin-right: 6px;
  }

  &:hover {
    cursor: pointer;
    border: ${props =>
      props.isSelected
        ? "2px solid rgba(0, 0, 0, 0.8)"
        : "2px solid rgba(0, 0, 0, 0.6)"};
  }

  &:focus {
    outline: none;
  }
`;

const ColorSelector = ({ backgroundColors, selectedColor, onButtonClick }) => (
  <Wrapper>
    {backgroundColors.map(color => (
      <Button
        tabIndex="-1"
        onClick={() => onButtonClick(color.name)}
        key={color.name}
        colorValue={color.value}
        isSelected={color.name === selectedColor}
      />
    ))}
  </Wrapper>
);

ColorSelector.propTypes = {
  backgroundColors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  onButtonClick: PropTypes.func.isRequired,
  selectedColor: PropTypes.string.isRequired
};

export default ColorSelector;

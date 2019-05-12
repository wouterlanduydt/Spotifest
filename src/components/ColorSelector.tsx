import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 0;
`;

const Button = styled.button<{ isSelected: boolean; color: string }>`
  border: ${({ isSelected }) =>
    isSelected ? "2px solid rgba(0, 0, 0, 0.8)" : "none"};
  width: 24px;
  height: 24px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  padding: 2px;
  background-clip: content-box;
  transition: border 50ms ease-in-out;

  &:not(:last-child) {
    margin-right: 6px;
  }

  &:hover {
    cursor: pointer;
    border: ${({ isSelected }) =>
      isSelected
        ? "2px solid rgba(0, 0, 0, 0.8)"
        : "2px solid rgba(0, 0, 0, 0.6)"};
  }

  &:focus {
    outline: none;
  }
`;

type TProps = {
  backgroundColors: string[];
  selectedColor: string;
  onButtonClick: (color: string) => void;
};

const ColorSelector = ({
  backgroundColors,
  selectedColor,
  onButtonClick
}: TProps) => (
  <Wrapper>
    {backgroundColors.map(color => (
      <Button
        tabIndex={-1}
        onClick={() => onButtonClick(color)}
        key={color}
        color={color}
        isSelected={color === selectedColor}
      />
    ))}
  </Wrapper>
);

export default ColorSelector;

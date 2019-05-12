import React from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 0;
`;

const Button = styled.button<{ isSelected: boolean }>`
  border: none;
  ${({ isSelected }) =>
    isSelected
      ? css`
          background-color: rgba(0, 0, 0, 0.8);
          color: white;
        `
      : css`
          background-color: white;
          color: rgba(0, 0, 0, 0.8);
        `} padding: 4px 12px;
  font-size: 3.8vw;
  font-weight: 500;
  margin: 0;
  border: 2px solid rgba(0, 0, 0, 0.8);
  transition: all 200ms ease-in-out;

  &:first-child {
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    border-radius: 0 4px 4px 0;
  }

  &:nth-child(2) {
    margin: 0 -2px;
  }

  &:hover,
  &:focus {
    outline: none;
    cursor: pointer;
    color: white;
    background-color: rgba(0, 0, 0, 0.7);
  }

  @media (min-width: 400px) {
    font-size: 1.4em;
  }
`;

type TProps = {
  timeRanges: {
    value: string;
    label: string;
  }[];
  handleTimeRangeChange: (i: number) => void;
  selectedTimeRangeIndex: number;
};

const TimeRangeSelector = ({
  timeRanges,
  handleTimeRangeChange,
  selectedTimeRangeIndex
}: TProps) => (
  <Wrapper>
    {timeRanges.map((timeRange, i) => (
      <Button
        key={timeRange.label}
        isSelected={selectedTimeRangeIndex === i}
        onClick={() => handleTimeRangeChange(i)}
      >
        {timeRange.label}
      </Button>
    ))}
  </Wrapper>
);

export default TimeRangeSelector;

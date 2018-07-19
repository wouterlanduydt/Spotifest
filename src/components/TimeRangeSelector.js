import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 0;
`;

const Button = styled.button`
  border: none;
  ${props =>
    props.isSelected
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
  border: 2px solid rgba(0, 0, 0, 0.8);

  &:first-child {
    margin-right: -2px;
  }

  &:last-child {
    margin-left: -2px;
  }

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 400px) {
    font-size: 1.4em;
  }
`;

const TimeRangeSelector = ({
  timeRanges,
  handleTimeRangeChange,
  selectedTimeRangeIndex
}) => (
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

TimeRangeSelector.propTypes = {
  timeRanges: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  handleTimeRangeChange: PropTypes.func.isRequired,
  selectedTimeRangeIndex: PropTypes.number.isRequired
};

export default TimeRangeSelector;

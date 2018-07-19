import React from "react";
import PropTypes from "prop-types";

const TimeRangeSelector = ({ timeRanges, handleTimeRangeChange }) => (
  <div>
    {timeRanges.map((timeRange, i) => (
      <button key={timeRange.label} onClick={() => handleTimeRangeChange(i)}>
        {timeRange.label}
      </button>
    ))}
  </div>
);

TimeRangeSelector.propTypes = {
  timeRanges: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  handleTimeRangeChange: PropTypes.func.isRequired
};

export default TimeRangeSelector;

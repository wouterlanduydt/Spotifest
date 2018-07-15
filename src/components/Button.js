import React from "react";

const Button = ({ onButtonClick, text }) => (
  <button onClick={onButtonClick}>{text}</button>
);

export default Button;

import React from "react";
import styled from "styled-components";

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

type TProps = {
  onClick:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  text: string;
};

const Button = ({ onClick, text }: TProps) => (
  <StyledButton onClick={onClick}>{text}</StyledButton>
);

export default Button;

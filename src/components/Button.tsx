import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button<{ buttonStyle: TProps['buttonStyle'] }>`
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  background-color: ${({ buttonStyle }) => (buttonStyle === 'spotify' ? '#1fc14a' : 'white')};
  color: ${({ buttonStyle }) => (buttonStyle === 'spotify' ? 'white' : '#292e49')};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

type TProps = {
  onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  children: string;
  buttonStyle?: 'spotify' | 'normal';
};

const Button = ({ onClick, children, buttonStyle = 'normal' }: TProps) => (
  <StyledButton onClick={onClick} buttonStyle={buttonStyle}>
    {children}
  </StyledButton>
);

export default Button;

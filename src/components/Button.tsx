import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledButton = styled.button<{
  buttonStyle: TProps['buttonStyle'];
  disabled: TProps['disabled'];
}>`
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  background-color: ${({ buttonStyle }) => (buttonStyle === 'spotify' ? '#1fc14a' : 'white')};
  color: ${({ buttonStyle }) => (buttonStyle === 'spotify' ? 'white' : '#292e49')};
  font-size: 16px;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  transition: opacity 200ms;
`;

type TProps = {
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  children: string;
  buttonStyle?: 'spotify' | 'normal';
  disabled?: boolean;
  title?: string;
  to?: string;
};

const Button = ({
  onClick,
  children,
  buttonStyle = 'normal',
  disabled = false,
  title,
  to,
}: TProps) => (
  <Link to={to || ''}>
    <StyledButton onClick={onClick} buttonStyle={buttonStyle} disabled={disabled} title={title}>
      {children}
    </StyledButton>
  </Link>
);

export default React.memo(Button);

import React from 'react';
import styled, { css } from 'styled-components';
import { ETimeRange, ESortCriteria } from 'types/general';
import { connect } from 'react-redux';
import { getTopArtistsStart } from 'redux/actions';
import { IState } from 'redux/reducers';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0 0;
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

  &:not(:last-child) {
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

type TProps<T> = {
  initialValue: T;
  items: T[];
  onChange: (value: T) => void;
};

// TODO: fix types
const TabBar = <T extends ETimeRange | ESortCriteria>({
  items,
  onChange,
  initialValue,
}: TProps<T>) => {
  const [selectedItem, setSelectedItem] = React.useState(initialValue);

  return (
    <Wrapper>
      {items.map(item => (
        <Button
          key={String(item)}
          onClick={() => {
            onChange(item);
            setSelectedItem(item);
          }}
          isSelected={item === selectedItem}
        >
          {item}
        </Button>
      ))}
    </Wrapper>
  );
};

export default React.memo(TabBar);

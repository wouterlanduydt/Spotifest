import React from 'react';
import ReactSelect from 'react-select';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 100%;
`;

const Label = styled.label`
  color: white;
  font-weight: 500;
  font-size: 12px;
  margin-bottom: 6px;
  display: block;
`;

type TProps = {
  label: string;
  items: { value: string | number; label: string }[];
  onChange: (value: string) => void;
  initialIndex?: number;
};

export const Select = ({ items, onChange, initialIndex = 0, label }: TProps) => (
  <Wrap className="react-select">
    <Label>{label}</Label>
    <ReactSelect
      options={items}
      defaultValue={items[initialIndex]}
      // @ts-ignore
      onChange={val => onChange(val.value)}
      isSearchable={false}
      theme={theme => ({
        ...theme,
        borderRadius: 0,
      })}
    />
  </Wrap>
);

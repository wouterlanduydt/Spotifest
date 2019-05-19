import React from 'react';
import styled, { css } from 'styled-components';
import { ETimeRange, ESortCriteria } from 'types/general';
import Select from 'react-select';
import { GroupType, ValueType } from 'react-select/lib/types';

type TProps = {
  items: { value: string; label: string }[];
  onChange: (value: string) => void;
};

const TabBar = ({ items, onChange }: TProps) => (
  <Select
    options={items}
    defaultValue={items[0]}
    // @ts-ignore
    onChange={val => onChange(val.value)}
    isSearchable={false}
  />
);

export default React.memo(TabBar);

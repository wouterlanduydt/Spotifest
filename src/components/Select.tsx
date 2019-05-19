import React from 'react';
import Select from 'react-select';

type TProps = {
  items: { value: string; label: string }[];
  onChange: (value: string) => void;
};

const SelectComponent = ({ items, onChange }: TProps) => (
  <Select
    options={items}
    defaultValue={items[0]}
    // @ts-ignore
    onChange={val => onChange(val.value)}
    isSearchable={false}
    className="react-select"
    theme={theme => ({
      ...theme,
      borderRadius: 0,
    })}
  />
);

export default React.memo(SelectComponent);

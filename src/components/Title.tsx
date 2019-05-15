import React from 'react';

type TProps = {
  title: string;
};

const Title = ({ title }: TProps) => <h1>{title}</h1>;

export default Title;

import React from 'react';

type TProps = {
  size?: number;
  style?: React.CSSProperties;
};

export const LoadingIndicator = ({ style, size = 24 }: TProps) => (
  <img
    src={require('../assets/svg/loading-indicator.svg')}
    width={size}
    height={size}
    style={style}
    alt=""
  />
);

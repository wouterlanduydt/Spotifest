import React from 'react';

type TProps = {
  size?: number;
  style?: React.CSSProperties;
};

export const LoadingIndicator: React.FC<TProps> = ({ style, size = 24 }) => (
  <img
    src={require('../assets/svg/loading-indicator.svg')}
    width={size}
    height={size}
    style={style}
    alt=""
  />
);

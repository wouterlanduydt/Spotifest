import React from 'react';

type TProps = {
  size?: number;
  style?: React.CSSProperties;
};

const LoadingIndicator = ({ style, size = 24 }: TProps) => (
  <img
    src={require('../assets/svg/loading-indicator.svg')}
    width={size}
    height={size}
    style={style}
    alt=""
  />
);

export default React.memo(LoadingIndicator);

import React from 'react';
import { IState } from 'redux/reducers';

type TProps = {
  size?: number;
  style?: React.CSSProperties;
};

const LoadingIndicator = ({ style, size = 24 }: TProps) => (
  <img src={require('../assets/svg/loading-indicator.svg')} width={size} style={style} alt="" />
);

export default React.memo(LoadingIndicator);

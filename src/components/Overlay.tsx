import * as React from 'react';
import styled from 'styled-components';
import { LoadingIndicator } from 'components';

const Wrap = styled.div`
  position: fixed;
  user-select: none;
  z-index: 99999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Subtitle = styled.span`
  color: white;
  font-size: 14px;
  margin-top: 16px;
`;

type TProps = {
  text?: string;
};

const Overlay = ({ text }: TProps) => (
  <Wrap>
    <LoadingIndicator />
    {!!text && <Subtitle>{text}</Subtitle>}
  </Wrap>
);

export default React.memo(Overlay);

import styled from 'styled-components';

export const LoginWrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Filters = styled.div`
  display: flex;
  justify-content: center;
  max-width: 500px;
  margin: 0 auto;
  width: 96vw;
  margin-top: 16px;

  .react-select {
    width: 40%;
    z-index: 2;
  }

  .react-select:not(:last-child) {
    margin-right: 8px;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  max-width: 500px;
  margin: 16px auto;
  width: 96vw;

  button:not(:last-child) {
    margin-right: 8px;
  }
`;

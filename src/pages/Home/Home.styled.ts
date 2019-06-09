import styled from 'styled-components';

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 500px;
  margin: 16px auto;
  width: 96vw;

  > * {
    margin-bottom: 8px;

    &:not(:last-child) {
      margin-right: 8px;
    }
  }
`;

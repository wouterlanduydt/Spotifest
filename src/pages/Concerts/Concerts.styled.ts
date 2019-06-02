import styled from 'styled-components';

export const Wrap = styled.div`
  max-width: 960px;
  margin: 0 auto;
  width: 96vw;
`;

export const Filters = styled.div`
  margin: 32px 0;

  .react-select {
    width: 40%;
  }
`;

export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ol {
    width: 100%;
  }
`;

export const Title = styled.h2`
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 500;
  color: white;
`;

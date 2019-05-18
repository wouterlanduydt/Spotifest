import { css } from 'styled-components';

export default css`
  html {
    -webkit-text-size-adjust: 100%;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-size: 62.5%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;

    background: linear-gradient(45deg, #232526, #181818);
    min-height: 100vh;
  }
`;

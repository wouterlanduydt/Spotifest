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
    font-family: 'Poppins', sans-serif;

    background: linear-gradient(45deg, #111, #1d1d1d);
    min-height: 100vh;
  }

  .hide {
    display: none;
  }
`;

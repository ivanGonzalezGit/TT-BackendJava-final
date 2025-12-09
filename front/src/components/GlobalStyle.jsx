import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 16px;
    --fuente-principal: 'Roboto', sans-serif;
    background-color: blue;
  }

  @media (max-width: 361px) {
    :root {
      font-size: 10px;
    }
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--fuente-principal);
    font-weight: 200;
    font-style: normal;
    font-optical-sizing: auto;
    font-variation-settings: "wdth" 100;
    background-color: #fefefe;
  }
`;

export default GlobalStyle;

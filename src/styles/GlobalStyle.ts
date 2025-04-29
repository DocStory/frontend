import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

  html, body, * {
    font-family: 'Pretendard', 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

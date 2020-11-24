import { createGlobalStyle } from 'styled-components';

import githubBack from '../assets/Github-back.svg';

export default createGlobalStyle`
*{
  margin:0;
  padding:0;
  outline:0;
  box-sizing: border-box;
}
body {
  background: #F0FaF5 url(${githubBack}) no-repeat 70% top;
  -webkit-font-smoothing: antialised;
}
body, input, button {
  font: 16px roboto, sans-serif;
}
#root {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px
}
button{
  cursor:pointer;
}
`;

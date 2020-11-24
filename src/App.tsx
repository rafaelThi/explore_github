import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalCSS from './styles/global';
import Routes from './routes';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalCSS />
    </>
  );
}

export default App;

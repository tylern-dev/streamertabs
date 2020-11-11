import React from 'react'
import ReactDOM from 'react-dom'
import App from './views/Popup/App'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    width: 600px;
    margin: 0px;
    box-sizing: border-box;
    /* background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%); */
    background-color: #1B1B33;

  }
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />

      <App />

  </React.StrictMode>,
  document.getElementById('root')
);

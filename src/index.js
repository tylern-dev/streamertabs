import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './views/Popup/App'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html{
    overflow: scroll;
  }

  body::-webkit-scrollbar {
    width: .8em;
  }

  body::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  body::-webkit-scrollbar-thumb {
    background-color: #1B1B33;
    border: 2px solid #5A5EB0;
  }
  body {
    width: 600px;
    margin: 0px;
    box-sizing: border-box;
    background-color: #1B1B33;

  }
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

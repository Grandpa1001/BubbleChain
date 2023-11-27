import React from 'react'
import logo from './../logo.svg';
import '../Login.css';


const App = () => {
  return (
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Lecimy z nowym projektem.
      </p>
      <a
        className="App-link"
        href="https://github.com/Grandpa1001/BubbleChain"
        target="_blank"
        rel="noopener noreferrer"
      >
       Grandpa1001
      </a>
    </header>
  </div>
  )
}

export default App
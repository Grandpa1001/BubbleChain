import React from 'react'
import logo from './../logo.svg';
import '../Login.css';
import { useNavigate } from 'react-router-dom';
import {Button} from '@mui/material';
import { logOut } from '../service/firebase';




const App = () => {
    const navigate = useNavigate();


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
    <Button 
              onClick={logOutProfile}
              variant="contained"
              margin="normal"
              style={{ marginBottom: '30px' }}>
                Logout
            </Button>
  </div>
  )

  function logOutProfile(){
    logOut();
    navigate('/');
}
}




export default App


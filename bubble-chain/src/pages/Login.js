import React, {useState, useEffect} from 'react';
import {Button, TextField,Box} from '@mui/material';
import {AccountCircle, Lock, Terminal} from '@mui/icons-material';
import { auth, createAccount, loginAccount } from '../service/firebase';
import { useNavigate } from 'react-router-dom';

let user = null;

export const getUser = () => {
    return user;
  };


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userParam => {
            if (userParam) {
                console.log("Zalogowany "+ userParam.email)
                user = userParam;
                navigate('/app');
            }
        })
    return unsubscribe
    }, [])


    const handleSignUp = () => {
      createAccount(email, password, handleAuthenticationError);
  }

  const handleLogin = () => {
      loginAccount(email, password, handleAuthenticationError);
  }

  const handleAuthenticationError = (errorMessage) => {
      if (errorMessage) {
          setLoginError(errorMessage);
      } else {
          setLoginError('');
      }
  };

  return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh">
           <Terminal sx={{ color: 'action.active', fontSize: 50}} />
           <div>BubbleChain</div>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField 
              id="login" 
              label="Login email" 
              variant="standard" 
              type="email" 
              placeholder="rofl@rolo.eth" 
              onChange={(e) => setEmail(e.target.value)}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Lock sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField 
              id="password" 
              label="Password" 
              variant="standard" 
              type="password" 
              placeholder="Type secret password" 
              onChange={(e) => setPassword(e.target.value)}/>
            </Box>
            <Button 
              onClick={handleLogin} 
              variant="contained"
              margin="normal"
              style={{ marginTop: '20px' }}>
                Login
            </Button>
            <div>{loginError}</div>
            <Button 
              onClick={handleSignUp} 
              variant="outlined" 
              margin="normal"
              style={{ marginTop: '20px' }}>
                Register
              </Button>
      </Box>
  );
}

export default Login;


import '../Login.css';
import React, {useState, useEffect} from 'react';
import { auth, createAccount, loginAccount } from '../service/firebase';

let user = null;

export const getUser = () => {
    return user;
  };


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userParam => {
            if (userParam) {
                console.log("Zalogowany "+ userParam.email)
                //navigation.navigate("Home");
                user = userParam;
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
    <div className="App">
          <header className="App-header">
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Hasło" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleSignUp}>Zarejestruj</button>
          <button onClick={handleLogin}>Zaloguj</button>
          <div>{loginError}</div>
          </header>
   </div>
  );
}

export default Login;

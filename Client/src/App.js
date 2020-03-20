import React, { useState,useEffect } from 'react';
import LoginPage from './Page/LoginPage';
import MainPage from './Page/MainPage';
import { withStyles } from '@material-ui/core/styles';
import { withCookies } from 'react-cookie';

const styles = {
  app: {
    textAlign: 'center'
  },
  bodyWrap: {
    border: '1px rgb(248, 247, 247) solid',
    width: 1280,
    height: 720,
    margin: 0,
    padding: 10,
    position: 'relative',
    backgroundColor: '#b6d0fa'
  }
}

const App = ({ cookies,classes }) => {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = (email) => {
    cookies.set('email', email, { path: '/' });
    setEmail(email);
    setLogin(true);
    return true;
  }
  
  useEffect(() => {
    const getEmail = cookies.get('email');
    console.log(getEmail);
    if (getEmail !== undefined) {
      setEmail(getEmail);
      setLogin(true);
    }
  },[cookies,login]);
  console.log('make app');

  return (
    <div className={classes.app}>
      {login === false
        ? <LoginPage handleLogin={handleLogin}/>
        : <div className={classes.bodyWrap}>
          <MainPage
            email={email}
          />
        </div>
      }
    </div>
  );
}

export default withStyles(styles)(withCookies(App));

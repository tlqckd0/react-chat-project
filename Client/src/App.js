import React from 'react';
import LoginPage from './Page/LoginPage';
import MainPage from './Page/MainPage';
import { withStyles } from '@material-ui/core/styles';

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      email: 'tester',
      password: ''
    }
  }

  //로그인
  handleLogin = (email, password) => {
    //나중에 passport.js 이용해서 구현하자 근대 어캐 연결하지??
    this.setState({
      login: true,
      email, password
    })
    return true;
  }

  render() {
    const { classes } = this.props;
    const { email, login } = this.state;
    return (
      <div className={classes.app}>
        {login === false
          ? <LoginPage handleLogin={this.handleLogin} page={'LoginPage'} />
          : <div className={classes.bodyWrap}>
              <MainPage
                email={email}
              />
            </div>
        }

      </div>
    )
  }
}

export default withStyles(styles)(App);

import React from 'react';
import './App.css';

import LoginPage from './Page/LoginPage';
import MainPage from './Page/MainPage';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      email: '',
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
  }

  render() {
    const { email, login } = this.state;
    return (
      <div className="App">
        <div id="body-wrap">
          {login === false
            ? <LoginPage handleLogin={this.handleLogin} page={'LoginPage'} />
            : <MainPage
              email={email}
            />
          }
        </div>
      </div>
    )
  }
}

export default App;

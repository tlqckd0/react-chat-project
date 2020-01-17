import React from 'react';
import Login from '../Component/Login'

class LoginPage extends React.Component{
    render(){
        return(
            <Login handleLogin={this.props.handleLogin}/>
        )
    }
}

export default LoginPage;
import React from 'react';
import './CSS/Login.css'

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
        }
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    handleValueChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleLogin = ()=>{
        //로그인 처리
        const {email, password} = this.state;
        this.props.handleLogin(email,password);
    }
    render() {
        const {email, password} = this.state;
        const {handleValueChange,handleLogin} =this;
        return (
            <div id="login-wrap">
                <div id="login-form">
                    <table>
                        <tr>
                            <td><input 
                                    type="text" 
                                    id="email" 
                                    name="email" 
                                    placeholder="email"
                                    value={email}
                                    onChange={handleValueChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><input 
                                    type="text" 
                                    id="password" 
                                    name="password" 
                                    placeholder="password"
                                    value={password}
                                    onChange={handleValueChange}
                            /></td>
                        </tr>
                    </table>
                </div>
                <div>
                    <div id="login" onClick={handleLogin}>
                        로그인
                    </div>
                </div>
                <div>
                    <div id="register">
                        회원가입
                    </div>
                    <div id="findInfo">
                        이메일/비밀번호 찾기
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
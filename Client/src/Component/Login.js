import React from 'react';
import Paper from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    loginWrap: {
        margin: 'auto',
        width: 400,
        height: 300,
        marginTop: 150
    },
    loginForm: {
        width: 400,
    },
    textField: {
        width: 400,
        margin: theme.spacing(2)

    },
    loginButton: {
        width: 400,
        margin: theme.spacing(2)
    }
})

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    handleValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleLogin = () => {
        //로그인 처리
        const { email, password } = this.state;
        if(email==='' || password===''){
            alert('이메일과 비밀번호를 입력해주세요');
        }
        const result =  this.props.handleLogin(email, password);
        if(result === true){
            alert('환영합니다!');
        }else{
            alert('회원정보가 정확하지 않습니다.');
        }
    }

    render() {
        const { email, password } = this.state;
        const { classes } = this.props;
        const { handleValueChange, handleLogin } = this;
        return (
            <Paper className={classes.loginWrap} elevation={3}>
                <span>시작하기</span>
                <form className={classes.loginForm}>
                    <TextField
                        className={classes.textField}
                        id="email-text"
                        label="이메일"
                        type="email"
                        variant="outlined"
                        value={email}
                        name='email'
                        onChange={handleValueChange}
                        required='true'
                    />
                    <TextField
                        className={classes.textField}
                        id="password-text"
                        label="비밀번호"
                        type="password"
                        variant="outlined"
                        value={password}
                        name='password'
                        onChange={handleValueChange}
                        required='true'
                    />
                    <Button className={classes.loginButton} variant="contained" color="primary" onClick={handleLogin}>로그인</Button>
                    <Button className={classes.loginButton} variant="contained" color="secondary" >회원가입하기</Button>
                </form>
            </Paper>
        )
    }
}

export default withStyles(styles)(Login);
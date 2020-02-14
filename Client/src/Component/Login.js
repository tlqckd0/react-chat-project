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
            email: ''
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
        const { email } = this.state;
        if(email==='' ){
            alert('닉네임을 입력해주세요~');
        }
        const result =  this.props.handleLogin(email);
        if(result === true){
            alert('환영합니다!');
        }else{
            alert('오류 발생!');
        }
    }

    handleKeyPress = (e) => {
        if (e.charCode === 13) {
            this.handleLogin();
        }
        return false;
    }

    render() {
        const { email } = this.state;
        const { classes } = this.props;
        const { handleValueChange, handleLogin,handleKeyPress } = this;
        return (
            <Paper className={classes.loginWrap} elevation={3}>
                <span>시작하기</span>
                <form className={classes.loginForm}>
                    <TextField
                        className={classes.textField}
                        id="email-text"
                        label="닉네임"
                        variant="outlined"
                        value={email}
                        name='email'
                        onChange={handleValueChange}
                        onKeyPress={handleKeyPress}
                        required='true'
                    />
                    <Button 
                        className={classes.loginButton} 
                        variant="contained" color="primary" 
                        onClick={handleLogin}
                    >접속하기!</Button>
                </form>
            </Paper>
        )
    }
}

export default withStyles(styles)(Login);
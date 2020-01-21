import React from 'react';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = {
    userInfo:{
        border: '1px solid black',
        background: 'white',
        margin: 0,
        marginBottom: 10,
        padding: 10,
        width: 400,
        height: 165,
        boxShadow: 'grey 2px 2px 3px,grey -2px -2px 3px'
    }
}

class UserInfo extends React.Component{
    render(){
        const {nick,classes} = this.props;
        return(
            <Paper className={classes.userInfo}>
                <div>
                    nick : {nick}
                </div>
                <div>
                    안뇽 ㅋㅋ
                </div>
            </Paper>
        )
    }
}

export default withStyles(styles)(UserInfo);
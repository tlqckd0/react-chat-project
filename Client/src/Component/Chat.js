import React from 'react';
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
    chattingRoom: {
        boxShadow: 'grey 2px 2px 3px,grey -2px -2px 3px',
        display: 'inline-block',
        backgroundColor: 'white',
        margin: 0,
        padding: 10,
        border: '1px solid black',
        width: 400,
        height: 500,
    },
    chattingMessage: {
        overflow: 'auto',
        listStyleType: 'none',
        height: 450,
        width: '100%',
        margin: 0,
        padding: 0,
        marginBottom: 10,
        border: '1px solid black'
    },
    message: {
        width: '100%',
        height: 30,
        fontSize: '2rem'
    },
    systemMsg: {
        border: '1px grey solid',
        padding: 5,
        margin: 10,
        textAlign: 'center',
        backgroundColor: 'black',
        color: 'white',
        marginLeft: '10%',
        marginRight: '10%',
        boxShadow: 'yellow 2px 2px 3px,yellow -2px -2px 3px'
    },
    myMsg: {
        border: '1px grey solid',
        padding: '5px',
        margin: '10px',
        textAlign: 'left',
        borderRadius: 10,
        marginLeft: '30%',
        marginRight: 3,
        boxShadow: 'grey 2px 2px 3px,grey -2px -2px 3px'
    },
    othersMsg: {
        border: '1px grey solid',
        padding: 5,
        margin: 10,
        textAlign: 'left',
        borderRadius: 10,
        marginLeft: 3,
        marginRight: '30%',
        boxShadow: 'grey 2px 2px 3px,grey -2px -2px 3px'
    },
    Msg: {
        fontSize: 20
    }
})

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatKey: 0,
            message: ''
        }
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

    }

    handleValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleKeyPress = (e) => {
        if (e.charCode === 13) {
            this.handleSendMessage();
        }
        return false;
    }
    handleSendMessage = () => {
        const { sendMessage } = this.props;
        sendMessage(this.state.message);
        this.setState({
            message: ''
        })
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        const { handleValueChange, handleKeyPress } = this;
        const { message, chatKey } = this.state;
        const { classes, chattingMessages } = this.props
        let num = chatKey;

        const chattingList = chattingMessages.map(
            (chatting) => {
                if (chatting.who === 'system') {
                    return (
                        <li key={num++} className={classes.systemMsg}>
                            <Paper>{chatting.message}</Paper>
                        </li>
                    )
                } else if (chatting.who === 'me') {
                    return (
                        <li key={num++} className={classes.myMsg}>
                            <Box>{chatting.who} {chatting.time}<br />
                                <Box className={classes.Msg}>
                                    {chatting.message}
                                </Box>
                            </Box>
                        </li>
                    )
                } else {
                    return (
                        <li key={num++} className={classes.othersMsg}>
                            <Box>{chatting.who} {chatting.time}<br />
                                <Box className={classes.Msg}>
                                    {chatting.message}
                                </Box>
                            </Box>
                        </li>
                    )
                }

            }
        );

        return (
            <Box className={classes.chattingRoom}>
                <ul className={classes.chattingMessage}>
                    {chattingList}
                    <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </ul>
                <div>
                    <input
                        className={classes.message}
                        name="message"
                        autoComplete="off"
                        placeholder="채팅해요"
                        value={message}
                        onChange={handleValueChange}
                        onKeyPress={handleKeyPress}
                    />
                </div>
            </Box>
        )
    }
}

export default withStyles(styles)(Chat); 
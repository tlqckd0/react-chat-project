import React from 'react';
import './CSS/Chat.css'

class Chat extends React.Component {
    constructor(props){
        super(props);
        this.state={
            chatKey:0,
            message:''
        }
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

    }

    handleValueChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleKeyPress = (e)=>{
        if(e.charCode === 13){
            this.handleSendMessage();
        }
        return false;
    }

    handleSendMessage = ()=>{
        const {sendMessage} = this.props;
        sendMessage(this.state.message);
        this.setState({
            message:''
        })
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        console.log('render chat');
        const {handleValueChange,handleKeyPress} = this;
        const {message,chatKey} = this.state;
        let num = chatKey;
        const chattingList = this.props.chattingMessages.map(
            (chatting)=>{
                let type = '';
                if(chatting.who === 'system'){
                    type='system-msg';
                }else if(chatting.who === 'me'){
                    type='my-msg';
                }else{
                    type='others-msg';
                }
                return (<li key={num++} className={`msg ${type}`}>{chatting.who} : {chatting.message}</li>)
            }
        );

        return (
            <div id="chatting-room">
                <ul id="chatting-message">
                    {chattingList}
                    <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </ul>
                <div id="my-message">
                    <input 
                        className="message" 
                        name="message" 
                        autoComplete="off"
                        placeholder="채팅해요"
                        value={message} 
                        onChange={handleValueChange}
                        onKeyPress={handleKeyPress}
                    />
                </div>
            </div>
        )
    }
}

export default Chat; 
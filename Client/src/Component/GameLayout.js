import React from 'react';
import './CSS/GameLayout.css'

class GameLayout extends React.Component{
    handleLeaveRoom = ()=>{
        this.props.leaveRoom();
        this.props.GetRoomsInfo();
    }
    render(){
        return(
            <div id="GameLayout">
                <div id="roomManage">
                <button onClick={this.handleLeaveRoom}>방 나가기</button>
                </div>
            </div>
        )
    }
}

export default GameLayout;
import React from 'react';
import './CSS/Room.css'

class Room extends React.Component{
    handleEnterRoom = ()=>{
        const {roomNumber, enterRoom} =this.props;
        enterRoom(roomNumber);
    }
    render(){
        const {roomNumber, roomName, numOfPlayer} =  this.props;
        return(
            <div className="room" onClick={this.handleEnterRoom}>
                <div className="roomNumber">
                    {roomNumber}
                </div>
                <div className="noomName">
                    {roomName}
                </div>
                <div className="numOfPlayer">
                    {numOfPlayer} / 4
                </div>
            </div>
        )
    }
}

export default Room;
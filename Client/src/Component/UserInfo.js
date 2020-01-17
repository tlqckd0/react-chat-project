import React from 'react';
import './CSS/UserInfo.css'

class UserInfo extends React.Component{
    render(){
        const {nick} = this.props;
        return(
            <div id="UserInfo">
                <div>
                    nick : {nick}
                </div>
                <div>
                    안뇽 ㅋㅋ
                </div>
            </div>
        )
    }
}

export default UserInfo;
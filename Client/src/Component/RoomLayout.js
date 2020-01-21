import React from 'react';
import RoomList from './RoomList';
import { Button, ButtonGroup } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Paper } from '@material-ui/core'
import { AppBar } from '@material-ui/core';
import { withStyles, fade } from '@material-ui/core/styles';

const styles = theme => ({
    roomLayout: {
        display: 'inlineBlock',
        backgroundColor: 'white',
        color: 'white',
        padding: 0,
        margin: 0,
        marginRight: 50,
        border: '1px solid black',
        width: 800,
        height: 720,
        overflow: 'scroll',
        boxShadow: 'grey 2px 2px 3px,grey -2px -2px 3px'
    },
    appBar: {
        padding: theme.spacing(1),
        backgroundColor: 'black'
    },
    search: {
        borderRadius: theme.shape.borderRadius,
        color: 'white',
        backgroundColor: fade(theme.palette.common.white, 0.8),
        '&:hover': {
            backgroundColor: 'white'
        },
        '&:focus': {
            backgroundColor: 'white'
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: 500
    },
    buttonGroup: {
        width: 200,
    },
    button: {
        background: '#7B68EE',
        border: '2px white solid',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        fontWeight: 600,
        height: 60
    },
})

class RoomLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    handleValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    filterRoom = (roomList) => {
        const { search } = this.state;
        return roomList.filter(room => room.roomName.indexOf(search) >= 0);
    }
    render() {
        const { Rooms, GetRoomsInfo, makeRoom, enterRoom, classes } = this.props;
        const roomsList = this.filterRoom(Rooms);
        return (
            <Paper className={classes.roomLayout}>
                <AppBar className={classes.appBar} variant="outlined" position="static">
                    <div>
                        <ButtonGroup className={classes.buttonGroup}>
                            <Button className={classes.button} onClick={makeRoom}>방만들기</Button>
                            <Button className={classes.button} onClick={GetRoomsInfo}>새로고침</Button>
                        </ButtonGroup>
                        <TextField
                            className={classes.search}
                            variant="filled"
                            name="search"
                            type="search"
                            label="방 찾기"
                            value={this.state.search}
                            onChange={this.handleValueChange}
                        />
                    </div>
                </AppBar>
                <RoomList Rooms={roomsList} enterRoom={enterRoom} />
            </Paper>
        )
    }
}

export default withStyles(styles)(RoomLayout); 
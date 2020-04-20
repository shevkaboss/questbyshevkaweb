import React, { Component } from 'react';
import Api from '../utils/Api'

class NotStarted extends Component{
    constructor(props){
        super(props);
        this.callBack = this.props.callBack;
        this.handleClick = this.handleClick.bind(this);
    }
    async handleClick() {
        var result = await Api.get('/StartGame');
        if (result.status === 200)
            this.callBack(result.data);
    }
    render(){
        return(
            <div>
                <h1>Лашици впєрьод!</h1>
                <button onClick={this.handleClick}>Start game</button>
            </div>
        )
    }
}

export default NotStarted
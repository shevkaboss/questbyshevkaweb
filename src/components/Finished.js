import React, { Component } from 'react';
import sverlo from '../images/sverlo.jpeg'

class Finished extends Component{
    render(){
        return(
            <div className="finished-block">
                <h2>Вітаю! Квест майже закінчено.</h2>
                <div>
                    Ми чекаємо на вас тут:                                  
                </div>
                <b>{this.props.finishCoord}</b>  
                <img className="finish-img"src={sverlo}></img>

            </div>
        )
    }
}

export default Finished
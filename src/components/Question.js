import React, { Component } from 'react';

class Question extends Component{
    render(){
        var questionBlocks = this.props.questionData.questionBlocks.map(element => {
            return <div key={element.text}>{element.text}</div>;
        })  
        return(
            <div className='questionBlocks'>
                <h1>{this.props.questionData.title}</h1>
                {questionBlocks}
            </div>
        )
    }
}

export default Question
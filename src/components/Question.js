import React, { Component } from 'react';

class Question extends Component{
    render(){
        var questionBlocks = this.props.questionData.questionBlocks.map(element => {
            return (
            <div key={element.text} className='question-block' dangerouslySetInnerHTML = {{__html:element.text}}></div>     
            );
        })  
        return(
            <div className='question-blocks'>
                <h2>{this.props.questionData.title}</h2>
                {questionBlocks}
            </div>
        )
    }
}

export default Question
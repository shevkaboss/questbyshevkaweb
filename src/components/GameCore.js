import React, { Component } from 'react';
import Question from './Question';
import Api from '../utils/Api'

class GameCore extends Component{
    constructor(props){
        super(props);
        this.state = {
            questionData : this.props.initQuestion,
            numberOfKeys :  this.props.initQuestion.numberOfKeys,
            questionNumber : this.props.initQuestion.order,
            isLastQuestion : this.props.initQuestion.isLastQuestion,
            answerStatus : '',
            asnwerStatusColor : 'red',
            answerValue : ''
        }
        this.gameFinishedCallback = this.props.gameFinishedCallback;
        this.proceedAnswer = this.proceedAnswer.bind(this);
        this.proceedToNextQuestion = this.proceedToNextQuestion.bind(this);
    }
    async proceedAnswer(event){
        event.preventDefault();
        const data = {answer : this.state.answerValue, questionNumber : this.state.questionNumber};
        var result = await Api.post('/ProceedAnswer',data);
        this.state.answerValue = '';
        if (result.status === 200){
            if (result.data.isAnswerCorrect === 'Accepted'){
                if (result.data.needToProceedToNextQuestion === true){
                    if (this.state.isLastQuestion){              
                        this.gameFinishedCallback();
                        return;
                    }
                    this.proceedToNextQuestion();
                }
                else{
                    this.setState({answerStatus : 'Accepted', asnwerStatusColor : 'green'})
                }
            }
            else if (result.data.isAnswerCorrect === 'AlreadyAccepted'){
                if (this.state.isLastQuestion){
                    this.gameFinishedCallback();
                }
                this.setState({answerStatus : 'Already Accepted', asnwerStatusColor : 'yellow'})
            }
            else{
                this.setState({answerStatus : 'Wrong', asnwerStatusColor : 'red'})
            }

        }
    }

    async proceedToNextQuestion(){
        var result = await Api.get('/GetNextQuestion');
        if (result.status === 200){
            this.setState({questionData : result.data, numberOfKeys : result.data.numberOfKeys, questionNumber : result.data.order, isLastQuestion : result.data.isLastQuestion, answerStatus : ''})
        }
    }

    handleInputChange(e){
        this.setState({
            answerValue: e.target.value
          });
    }

    render(){
        let answerStatus;
        if (this.state.answerStatus !== '')
        {
            answerStatus = <div style = {{color: this.state.asnwerStatusColor}}>{this.state.answerStatus}</div>
        }
        return(
            <div className='game-core'>
                <Question questionData = {this.state.questionData}/>
                <form onSubmit={this.proceedAnswer} className = 'answer-form'>
                    <div className = 'nmbr-keys-h'> Number of answers needed (total): {this.state.numberOfKeys}. </div>
                    <input type="text" className = 'answr-input' value = {this.state.answerValue} onChange = {this.handleInputChange.bind(this)} />
                    {answerStatus}
                    <input type="submit" className = 'answr-input answr-submit' value="Procced Answer" />
                </form>
            </div>
        )
    }
}

export default GameCore


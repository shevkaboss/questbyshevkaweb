import React, {Component} from 'react';
import GameCore from './GameCore'
import NotStarted from './NotStarted'
import Api from '../utils/Api'
import Finished from './Finished';

class App extends Component{
  constructor(props){
    super(props);
    this.getGameCoreBlock  = this.getGameCoreBlock.bind(this);
    this.getGameStatus = this.getGameStatus.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.state = {
      gameStatus: '',
      initQuestion: ''
    }
  }

  render(){
    if (this.state.gameStatus === ''){
      return <h1>Loading...</h1>
    }
    let gameBlock = this.getGameCoreBlock(this.state.gameStatus);
    return (
      <div className = 'game-root'>
        {gameBlock}  
      </div>
    );
  }

  startGame(result){
    this.setState({
      gameStatus : 'Started',
      initQuestion : result});
  }

  async endGame(){
    var result = await Api.get('/FinishGame');
    if (result.status === 200){
      this.setState({
        gameStatus : 'Finished'
      });
    }
  }

  componentDidMount(){
    this.getGameStatus()
  }
  getGameCoreBlock(gameStatus){
    if (gameStatus === 'Started')
        return <GameCore initQuestion = {this.state.initQuestion} gameFinishedCallback = {this.endGame}/>
      else if (gameStatus === 'NotStarted')
        return <NotStarted callBack = {this.startGame.bind(this)}/>
      else
        return <Finished />
  }

  async getGameStatus(){
    var result = await Api.get('/GetGameStatus');
    if (result.status === 200)
      {
        if (result.data === 'Started'){
          var questionresult = await Api.get('/GetCurrentGame');
          if (questionresult.status === 200){
            this.startGame(questionresult.data);
            return;
          }
        }
        this.setState({gameStatus : result.data});
      }
  }
} 


export default App;

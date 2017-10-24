class Game {
  constructor(questions, timer, numQuestions){
    this.questions = questions;
    this.timer = timer;
    this.score = 0;
    this.numQuestions = numQuestions;
    this.numCorrect = 0;
    // this.username = username
  }

  renderGame(){
    const container = document.getElementById('main-container')
    this.renderScore();
    this.renderTimer();
    container.innerHTML = ''
    this.questions.forEach(
      q => {
        let questionHolder = document.createElement('div');
        q.renderQuestion(container, questionHolder);
        questionHolder.addEventListener('click', function(e){
          q.delegateAndCheck(this, e)
      }.bind(this))
    })//forEach
  }//function

  renderScore(){
    let score = document.getElementById('score');
    score.innerHTML = `<h1>Score: ${this.score}</h1>`
  }

  renderTimer(){
    let timer = document.getElementById('timer');
    timer.innerHTML = `<h1>Timer: ${this.timer}</h1>`
  }

  decrementTimer(){

  }


}

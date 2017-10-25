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

    container.innerHTML = ''
    this.questions.forEach(
      q => {
        let questionHolder = document.createElement('div');
        q.renderQuestion(container, questionHolder);
        questionHolder.addEventListener('click', function(e){
          q.delegateAndCheck(this, e);
          questionHolder.remove();
      }.bind(this))
    })//forEach
    this.renderTimer();
  }//function

  renderScore(){
    let score = document.getElementById('score');
    score.innerHTML = `<h1>Score: ${this.score}</h1>`
  }

  renderTimer(){
    let domTimer = document.getElementById('timer');
    domTimer.innerHTML = `<h1>${this.timer}</h1>`
    let timerHolder = domTimer.firstChild
    this.decrementTimer(this.timer, timerHolder)
  }

  decrementTimer(timer, el){
  let decTimer = setInterval(function(){
      if(timer === 0){
        clearInterval(decTimer)
        this.stopInput()
      }else{
        +el.innerText--
        timer--
      }
    }.bind(this), 1000)
  }

  stopInput(){
    const answerLinks = document.getElementsByClassName('answer-link')
    Array.from(answerLinks).forEach(function(link){
      let text = link.innerText
      link.parentNode.innerHTML = `<span>${text}</span>`
    })
    alert("Sorry, you ran out of time! Please start again.");
    // push results to rails api
    location.reload();
  }

}

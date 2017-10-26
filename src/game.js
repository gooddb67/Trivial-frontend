class Game {
  constructor(questions, difficulty, timer, numQuestions, app, user){
    this.questions = questions;
    this.timer = timer;
    this.score = 0;
    this.difficulty = difficulty;
    this.numQuestions = numQuestions;
    this.numAnsweredQuestions = 0;
    this.numCorrect = 0;
    this.app = app;
    this.user = user;
    this.gameComplete = false;
  }

  renderGame(){
    const container = document.getElementById('main-container')
    this.renderScore();

    container.innerHTML = ''
    this.questions.forEach(
      q => {
        console.log(q)
        let questionHolder = document.createElement('div');
        questionHolder.className = 'question' // added
        q.renderQuestion(container, questionHolder);
        questionHolder.addEventListener('click', function(e){
          if(e.target && e.target.nodeName === 'A'){

            if(q.checkAnswer(e.target.innerText, e.target.dataset.id)){
              q.game.numCorrect++
              q.game.score++
              q.game.renderScore();
            }
            questionHolder.remove();
            q.game.numAnsweredQuestions++
          }

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
    domTimer.innerHTML = `<h1>Timer: <span>${this.timer}</span></h1>`
    let timerHolder = document.querySelector("#timer h1 span")
    this.decrementTimer(this.timer, timerHolder)
  }

  decrementTimer(timer, el){
  let decTimer = setInterval(function(){
      if(timer === 0){
        clearInterval(decTimer)
        this.postGameResults()
        this.timesUp()
      } else if (timer !== 0 && this.numQuestions === this.numAnsweredQuestions){
        clearInterval(decTimer)
        this.postGameResults()
        this.renderGameResults()
      } else {
        +el.innerText--
        timer--
      }
    }.bind(this), 1000)
  }

  renderGameResults(){
    const container = document.getElementById('main-container')
    const gameResults = document.createElement('div')
    gameResults.setAttribute('class', 'game-results')
    gameResults.setAttribute('class', 'card')
    container.appendChild(gameResults)
    const headingContainer = document.createElement('h2')
    headingContainer.innerText = "Game Results"
    gameResults.appendChild(headingContainer)

    const score = document.createElement('p')
    score.innerText = `Score: ${this.numCorrect}/${this.numQuestions}`;
    const timer = document.createElement('p')
    timer.innerText = `Time Set: ${this.timer}`;
    const difficulty = document.createElement('p')
    difficulty.innerText = `Difficulty: ${this.difficulty}`

    gameResults.appendChild(score)
    gameResults.appendChild(timer)
    gameResults.appendChild(difficulty)
    this.addRestartLinkAndListener()
  }

  postGameResults(){
    fetch('http://127.0.0.1:3000/api/v1/games', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
        time: +this.timer,
        difficulty: this.difficulty,
        score: this.score,
        user_id: this.user.id
        })
      })
    .then(res => res.json())
    .then(console.log)
  }

  timesUp(){
    const answerLinks = document.getElementsByClassName('answer-link')
    Array.from(answerLinks).forEach(function(link){
      let text = link.innerText
      link.parentNode.innerHTML = `<span>${text}</span>`
    })
    this.renderGameResults()
  }

  assignGameToQuestions(){
    this.questions.forEach(q => q.game = this)
  }

  addRestartLinkAndListener(){
    const restartLink = document.createElement('a');
    restartLink.innerText = "Play again?"
    restartLink.setAttribute('href', '#')
    const container = document.getElementById('main-container');
    container.appendChild(restartLink);


  }

}

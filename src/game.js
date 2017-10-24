class Game {
  constructor(questions, timer, numQuestions){
    this.questions = questions;
    this.timer = timer;
    this.score = 0;
    this.numQuestions = numQuestions;
    this.numCorrect = 0;
    // this.username = username
  }

  renderQuestions(){
    const container = document.getElementById('main-container')
    this.renderScore();
    this.renderTimer();
    container.innerHTML = ''
    this.questions.forEach(
      q => {
        let mixedAnswers = q.answerRandomizer();
        let questionHolder = document.createElement('div');
        questionHolder.dataset.id = q.id
        questionHolder.innerHTML =
        `<p>${q.questionText}</p>
        <ol>
          <li><a href="#" data-id="${q.id}">${mixedAnswers[0]}</a></li>
          <li><a href="#" data-id="${q.id}">${mixedAnswers[1]}</a></li>
          <li><a href="#" data-id="${q.id}">${mixedAnswers[2]}</a></li>
          <li><a href="#" data-id="${q.id}">${mixedAnswers[3]}</a></li>
        </ol>`;
        container.appendChild(questionHolder)
        questionHolder.addEventListener('click', function(e){
          if(e.target && e.target.nodeName === 'A'){
            if(q.checkAnswer(e.target.innerText, e.target.dataset.id)){
              this.numCorrect++
              this.score++
              console.log(q)
              this.renderScore();
            }
          }//if
        }.bind(this))//listener
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

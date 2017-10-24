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
    container.innerHTML = ''
    // render all questions with progressively lower z-index
    // so they overlap
    this.questions.forEach(
      q => {
        let questionHolder = document.createElement('div');
        questionHolder.innerHTML = `<p>${q.question}</p>`;
        container.appendChild(questionHolder)
      })
  }

  decrementTimer(){

  }

  checkCorrectness(){

  }

}
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
    this.questions.forEach(
      q => {
        let mixedAnswers = q.answerRandomizer();
        let questionHolder = document.createElement('div');
        questionHolder.dataset.id = q.id
        questionHolder.innerHTML = 
        `<p>${q.questionText}</p>
        <ol> 
          <a href="#" data-id="1"><li>${mixedAnswers[0]}</li></a>
          <a href="#" data-id="2"><li>${mixedAnswers[1]}</li></a>
          <a href="#" data-id="3"><li>${mixedAnswers[2]}</li></a>
          <a href="#" data-id="4"><li>${mixedAnswers[3]}</li></a>
        </ol>`;
        container.appendChild(questionHolder)
      }
    )
  }



  decrementTimer(){

  }

  checkCorrectness(){

  }

}

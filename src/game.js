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
        questionHolder.innerHTML = `<p>${q.questionText}</p><ul> <li>${mixedAnswers[0]}</li> <li>${mixedAnswers[1]}</li> <li>${mixedAnswers[2]}</li> <li>${mixedAnswers[3]}</li> </ul>`;
        container.appendChild(questionHolder)
      }
    )
  }



  decrementTimer(){

  }

  checkCorrectness(){

  }

}

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
 //    var randomIndex = Math.floor(Math.random()*(i+1));
 // var itemAtIndex = input[randomIndex];
    this.questions.forEach(
      q => {
        let answer = q.correct_answer
        let allAnswers = q.incorrect_answers.slice()
        allAnswers.push(answer)
        allAnswers = this.answerRandomizer(allAnswers)
        let questionHolder = document.createElement('div');
        questionHolder.innerHTML = `<p>${q.question}</p><ul> <li>${allAnswers[0]}</li> <li>${allAnswers[1]}</li> <li>${allAnswers[2]}</li> <li>${allAnswers[3]}</li> </ul>`;
        container.appendChild(questionHolder)
      })
  }

  answerRandomizer(answers){
    for (var i = answers.length-1; i >=0; i--) {
      var randomIndex = Math.floor(Math.random()*(i+1));
      var itemAtIndex = answers[randomIndex];

      answers[randomIndex] = answers[i];
      answers[i] = itemAtIndex;
    }
    return answers
  }

  decrementTimer(){

  }

  checkCorrectness(){

  }

}

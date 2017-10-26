class Question {
  constructor(category, difficulty, type, questionText, incorrectAnswers, correctAnswer){
    this.id = id++
    this.category = category;
    this.difficulty = difficulty;
    this.type = type;
    this.questionText = questionText;
    this.correctAnswer = correctAnswer;
    this.incorrectAnswers = incorrectAnswers;
    this.game = null;
    this.correct = false;
    this.constructor.all.push(this)
  }

  renderQuestion(containingEl, childEl){
    let mixedAnswers = this.answerRandomizer();
    childEl.dataset.id = this.id
    childEl.innerHTML =
    `<div class="card">
      <p>${this.questionText}</p>
        <button><a href="#" class="answer-link" data-id="${this.id}">${mixedAnswers[0]}</a></button>
        <button><a href="#" class="answer-link" data-id="${this.id}">${mixedAnswers[1]}</a></button>
        <button><a href="#" class="answer-link" data-id="${this.id}">${mixedAnswers[2]}</a></button>
        <button><a href="#" class="answer-link" data-id="${this.id}">${mixedAnswers[3]}</a></button>
    </div>`;
    containingEl.appendChild(childEl)
  }


  // renderQuestion(containingEl, childEl){
  //   let mixedAnswers = this.answerRandomizer();
  //   childEl.dataset.id = this.id
  //   childEl.innerHTML =
  //   `<p>${this.questionText}</p>
  //   <ol>
  //     <li><a href="#" class="answer-link" data-id="${this.id}">${mixedAnswers[0]}</a></li>
  //     <li><a href="#" class="answer-link" data-id="${this.id}">${mixedAnswers[1]}</a></li>
  //     <li><a href="#" class="answer-link" data-id="${this.id}">${mixedAnswers[2]}</a></li>
  //     <li><a href="#" class="answer-link" data-id="${this.id}">${mixedAnswers[3]}</a></li>
  //   </ol>`;
  //   containingEl.appendChild(childEl)
  // }

  getAllAnswers(){
    return this.incorrectAnswers.concat(this.correctAnswer)
  }

  answerRandomizer(){
    let answers = this.getAllAnswers();
    for (let i = answers.length-1; i >=0; i--) {
      let randomIndex = Math.floor(Math.random()*(i+1));
      let itemAtIndex = answers[randomIndex];

      answers[randomIndex] = answers[i];
      answers[i] = itemAtIndex;
    }
    return answers
  }

  // delegateAndCheck(gameInstance, ev){
  //
  // }

  static findQuestionById(id){
    return Question.all.find((question) =>{
      return question.id === id
    })
  }

  checkAnswer(answer, questionId){

    let q = Question.findQuestionById(parseInt(questionId))
    if (answer === q.correctAnswer){
      this.correct = true
      return true
    }else{
      return false
    }
  }

}

Question.all = []
let id = 1;

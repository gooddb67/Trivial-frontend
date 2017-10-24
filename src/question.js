class Question {
  constructor(category, difficulty, type, questionText, incorrectAnswers, correctAnswer){
    this.id = id++
    this.category = category;
    this.difficulty = difficulty;
    this.type = type;
    this.questionText = questionText;
    this.correctAnswer = correctAnswer;
    this.incorrectAnswers = incorrectAnswers;
    this.correct = false;
    this.constructor.all.push(this)
  }

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

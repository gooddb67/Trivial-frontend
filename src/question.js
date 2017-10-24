class Question {
  constructor(category, difficulty, type, questionText, answers, correctAnswer){
    this.category = category;
    this.difficulty = difficulty;
    this.type = type;
    this.questionText = questionText;
    this.correctAnswer = correctAnswer;
    this.correct = false
  }
}

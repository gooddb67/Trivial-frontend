class User {
  constructor(id, username, games){
    this.id = id;
    this.username = username;
    this.game = null
    this.allGames = games
  }

  allTimeStats(){
    let games = this.allGames.slice()
    games.push(this.game)
    let results = {questions: 0, correct: 0}
    for(let i = 0; i < games.length; i++){
      if(i !== games.length - 1){
        results.questions += games[i].num_questions
        results.correct += games[i].num_correct
      } else {
        results.questions += games[i].numQuestions
        results.correct += games[i].numCorrect
      }
    }
    return results
  }

}

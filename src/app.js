class App {
  constructor(){
    this.game = null
    this.user = null
    this.categories = [
    {
      "id": 9,
      "name": "General Knowledge"
    },
    {
      "id": 10,
      "name": "Entertainment: Books"
    },
    {
      "id": 11,
      "name": "Entertainment: Film"
    },
    {
      "id": 12,
      "name": "Entertainment: Music"
    },
    {
      "id": 21,
      "name": "Sports"
    },
    {
      "id": 23,
      "name": "History"
    }]
  }

  renderUserForm(){
    const container = document.getElementById('main-container')
    container.innerHTML = `
    <form id='user-form'>
    <input type="text" name="username" id="user-input" placeholder="Username">
    <input type="submit">
    </form>`

    this.sendFetchPost()
  }

  sendFetchPost(){
    const userForm = document.getElementById('user-form')
    const input = document.getElementById('user-input')
    userForm.addEventListener('submit', function(ev){
      ev.preventDefault();
      fetch('http://127.0.0.1:3000/api/v1/users', {
        method: 'POST',
        body: JSON.stringify({username: `${input.value}`}),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
      .then(user => {
        let curUser = new User(user.id, user.username)
        this.user = curUser
        this.renderAndFetchGameForm()
      })
    }.bind(this))

  }

  renderAndFetchGameForm(){
    this.renderGameForm();
    this.addFormListener()
  }

  renderGameForm(){
    const container = document.getElementById('main-container')

    container.innerHTML = ''

    container.innerHTML = `<form id="game-form">
        <label for="category">Select Category</label>
        <select id="category-select">
          <option data-id="9">General Knowledge</option>
          <option data-id="10">Books</option>
          <option data-id="11">Film</option>
          <option data-id="12">Music</option>
          <option data-id="21">Sports</option>
          <option data-id="23">History</option>
        </select><br>
        <label for="difficulty">Select Difficulty</label>
        <select id="difficulty-select">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select><br>
        <label for="time">Set Time (in seconds)</label>
        <input type="number" name="time" min="1" max="480" id="time-amount" value="50"><br>
        <label for="questions">How many questions?</label>
        <input type="number" name="questions" min="1" max="50" id="question-amount" value="10"><br>
        <input type="submit">
      </form>`

  }

  addFormListener(){
    const newGame = document.getElementById("game-form")
    newGame.addEventListener('submit', function(e){
      this.fetchGame(e)
    }.bind(this))
  }

  fetchGame(e){
    e.preventDefault()
    const categorySelect = document.getElementById("category-select")
    const difficultySelect = document.getElementById("difficulty-select")
    const timeValue = document.getElementById("time-amount").value
    const questionValue = document.getElementById("question-amount").value
    const categoryValue = categorySelect.options[categorySelect.selectedIndex].dataset.id
    const difficultyValue = difficultySelect.options[difficultySelect.selectedIndex].text.toLowerCase()

    const URL = `https://opentdb.com/api.php?amount=${questionValue}&category=${categoryValue}&difficulty=${difficultyValue}&type=multiple`

    fetch(`${URL}`)
    .then(res => res.json())
    .then(json => this.makeGame(json, timeValue))
  }

  makeGame(data, timerVal){
    let questions = data.results.map((question) => {
      return new Question(question.category, question.difficulty, question.type, question.question, question.incorrect_answers, question.correct_answer)

    })
    let game = new Game(questions, questions[0].difficulty, timerVal, data.results.length, this, this.user);
    console.log(this)
    game.assignGameToQuestions();
    this.user.game = game
    this.game = game
    game.renderGame();
  }
}

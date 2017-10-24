class App {
  constructor(){

  }

  fetchCategories(){
  fetch('https://opentdb.com/api_category.php')
  .then(res => res.json())
  .then(json => addCategories(json.trivia_categories))
  }

  renderForm(){
    const container = document.getElementById('main-container')
    container.innerHTML = `<form id="game-form">
          <label for="category">Select Category</label>
          <select id="category-select"></select><br>

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

  addCategories(categories){
    const categorySelect = document.getElementById("category-select")
    for(i = 0; i < 5; i++){
      let categoryHolder = document.createElement('option')
      categoryHolder.dataset.id = categories[i].id
      categoryHolder.innerText = categories[i].name
      categorySelect.appendChild(categoryHolder)
    }
    addFormListener()
  }

  addFormListener(){
    const newGame = document.getElementById("game-form")
    newGame.addEventListener('submit', function(e){
      fetchGame(e)
    })
  }

  fetchGame(e){
    e.preventDefault()
    const categorySelect = document.getElementById("category-select")
    const difficultySelect = document.getElementById("difficulty-select")
    const timeValue = document.getElementById("time-amount").value
    const questionValue = document.getElementById("question-amount").value
    const categoryValue = categorySelect.options[categorySelect.selectedIndex].dataset.id
    const difficultyValue = difficultySelect.options[difficultySelect.selectedIndex].text.toLowerCase()

  //https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple
    const URL = `https://opentdb.com/api.php?amount=${questionValue}&category=${categoryValue}&difficulty=${difficultyValue}&type=multiple`

    fetch(`${URL}`)
    .then(res => res.json())
    .then(json => console.log(json))
  }

}
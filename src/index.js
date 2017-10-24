document.addEventListener('DOMContentLoaded', function(){
  fetch('https://opentdb.com/api_category.php')
  .then(res => res.json())
  .then(json => addCategories(json.trivia_categories))
})

function addCategories(categories){
  const categorySelect = document.getElementById("category-select")
  for(i = 0; i < 5; i++){
    let categoryHolder = document.createElement('option')
    categoryHolder.dataset.id = categories[i].id
    categoryHolder.innerText = categories[i].name
    categorySelect.appendChild(categoryHolder)
  }
  addFormListener()
}

function addFormListener(){
  const newGame = document.getElementById("game-form")
  newGame.addEventListener('submit', function(e){
    fetchGame(e)
  })
}

function fetchGame(e){
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

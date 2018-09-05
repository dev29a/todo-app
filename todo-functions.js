// Fetch existing todos from local storage
const getSavedTodos = function(){
    //Read and parse the data when app loads up
    const todosJSON = localStorage.getItem('todos')

    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    }
    else {
        return []
    }
}

// Save todos to localstorage
const saveTodos = function(todos){
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Render application todos based on filters
const renderTodos = function(todos, filters) {
    //Find list of filtered todos based on filters object ---- START
    const filteredTodos = todos.filter(function(todo, index){
        // Below line does SearchText match as well as HideCompleted checkbox filter match.
        // I have combined both into one.
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase()) && (!filters.hideCompleted || !todo.completed)
    })
    // console.log(filteredTodos)    
    //Find list of filtered todos based on filters object ---- END

    // Incomplete todos message ------------START
    const incompleteTodos = filteredTodos.filter(function(todo, index){
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))
    // Incomplete todos message ------------END

    // Adding each todo in a paragraph ------------START
    filteredTodos.forEach(function(todo){
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
    // Adding each todo in a paragraph ------------END
}


// Get the dom structure for a note
const generateTodoDOM = function(todo){
   const todoEl = document.createElement('div')
   const checkBox = document.createElement('input')
   const todoText = document.createElement('span')
   const removeButton = document.createElement('button')
   
   checkBox.setAttribute('type', 'checkbox')
   todoEl.appendChild(checkBox) 

   todoText.textContent = todo.text
   todoEl.appendChild(todoText)

   removeButton.textContent = 'x'
   todoEl.appendChild(removeButton)
   
   return todoEl
}

//Get summary DOM
const generateSummaryDOM = function(incompleteTodos){
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos to complete!`
    return summary
}
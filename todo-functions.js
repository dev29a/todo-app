// Fetch existing todos from local storage
const getSavedTodos = () => {
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
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

//remove todo by id
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id )
    if(todoIndex > -1){
        todos.splice(todoIndex, 1)
    }
}

// Toggle the completed value for a given todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)
    if(todo != 'undefined'){
        todo.completed = !todo.completed
    }
}


// Render application todos based on filters
const renderTodos = (todos, filters) => {
    //Find list of filtered todos based on filters object ---- START
    const filteredTodos = todos.filter( (todo, index) => 
        // Below line does SearchText match as well as HideCompleted checkbox filter match.
        // I have combined both into one.
        todo.text.toLowerCase().includes(filters.searchText.toLowerCase()) && (!filters.hideCompleted || !todo.completed)
    )
    // console.log(filteredTodos)    
    //Find list of filtered todos based on filters object ---- END

    // Incomplete todos message ------------START
    const incompleteTodos = filteredTodos.filter((todo, index) =>!todo.completed)

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))
    // Incomplete todos message ------------END

    // Adding each todo in a paragraph ------------START
    filteredTodos.forEach((todo) => {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
    // Adding each todo in a paragraph ------------END
}


// Get the dom structure for a note
const generateTodoDOM = (todo) => {
   const todoEl = document.createElement('div')
   const checkBox = document.createElement('input')
   const todoText = document.createElement('span')
   const removeButton = document.createElement('button')
   
   //set todo checkboxes
   checkBox.setAttribute('type', 'checkbox')
   checkBox.checked = todo.completed
   todoEl.appendChild(checkBox) 
   checkBox.addEventListener('change', (e) => {
       toggleTodo(todo.id)
       saveTodos(todos)
       renderTodos(todos, filters)
   })
   

   //setup todo text
   todoText.textContent = todo.text
   todoEl.appendChild(todoText)

   //setup remove buttom
   removeButton.textContent = 'x'
   todoEl.appendChild(removeButton)
   removeButton.addEventListener('click', function(e){
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
   }) 
   
   return todoEl
}

//Get summary DOM
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos to complete!`
    return summary
}
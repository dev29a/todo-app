// const todos = [{text: 'Order cat food', completed: true},
//                 {text: 'Clean kitchen', completed: false},
//                 {text: 'Buy food', completed: false},
//                 {text: 'Do work', completed: true},
//                 {text: 'Exercise', completed: true}]

let todos = getSavedTodos()

// Filter object to search todos.
const filters = {
    searchText: '',
    hideCompleted: false
} 


// const paragraphs = document.querySelectorAll('p')

// paragraphs.forEach(function(p){
//     if (p.textContent.includes('the')){
//         p.remove()
//     }
// })


renderTodos(todos, filters)

document.querySelector('#search-text').addEventListener('input', function(e){
    filters.searchText = this.value
    renderTodos(todos, filters)
})

document.querySelector('#new-todo').addEventListener('submit', function(e){
    e.preventDefault()
    todos.push({
        text: e.target.elements.text.value,
        completed: false
    })  
    saveTodos(todos)
    renderTodos(todos, filters)
    e.target.elements.text.value = ''
})

document.querySelector('#hide-completed').addEventListener('change', function(e){
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})


// Listen for new todo creation --------------START
// document.querySelector('#add-todo').addEventListener('click', function(e){
//     console.log('Add a new todo')
// })    
// Listen for new todo creation --------------END

// Listen for todo text change, add new to do  ----- START
// document.querySelector('#new-todo-text').addEventListener('input', function(e){
//     console.log(this.value)
// })
// Listen for todo text change, add new to do  ----- END




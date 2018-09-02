const todos = [{text: 'Order cat food', completed: true},
                {text: 'Clean kitchen', completed: false},
                {text: 'Buy food', completed: false},
                {text: 'Do work', completed: true},
                {text: 'Exercise', completed: true}]

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

        const summary = document.createElement('h2')
        summary.textContent = `You have ${incompleteTodos.length} todos to complete!`
        document.querySelector('#todos').appendChild(summary)
        // Incomplete todos message ------------END

        // Adding each todo in a paragraph ------------START
        filteredTodos.forEach(function(todo){
            const p = document.createElement('p')
            p.textContent = todo.text
            document.querySelector('#todos').appendChild(p)
        })
        // Adding each todo in a paragraph ------------END
}

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




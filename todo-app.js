
const todos = [
    {text:'eat dinner',
        completed:true
    },
    {text: 'walk the dog', 
        completed:false
    },
    {text:'do groceries', 
        completed:true
    },
    {text:'laundry', 
        completed:false
    },
    {text:'buy food', 
        completed:true}
    ]

// const paragraphs = document.querySelectorAll('p')

// paragraphs.forEach(function(p, index){
//     if (p.textContent.includes('the')){
//         p.remove()
//     }
// })

const filters = {
    searchText: ''
}

const renderTodos = function(todos, filters){
    const filteredTodos = todos.filter(function(todo, index){
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    
    const incompleteTodos = filteredTodos.filter(function(todo, index){
        return !todo.completed
    })       

    document.querySelector('#todos').innerHTML = ''
    
    const summary = document.createElement('h2')
    summary.textContent =`You have ${incompleteTodos.length} todos left to complete!`
    document.querySelector('#todos').appendChild(summary) 
    
    filteredTodos.forEach(function(todo){
        const p = document.createElement('p')
        p.textContent = todo.text
        document.querySelector('#todos').appendChild(p)
    })
}

renderTodos(todos, filters)

document.querySelector('#search-text').addEventListener('input',function(e){
    filters.searchText = this.value
    renderTodos(todos, filters)
})


document.querySelector('#new-todo').addEventListener('submit', function(e){
    e.preventDefault()
    todos.push({
        text: this.elements.text.value,
        completed: false
    })
    renderTodos(todos, filters)
    this.elements.text.value = ''
})

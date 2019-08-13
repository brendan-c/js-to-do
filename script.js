const $ = (id, parent = document) => parent.getElementById(id)
const create = (element, parent = document) => parent.createElement(element)

var todoList = {
  todos: [],
  addTodo: function (id, todoText) {
    this.todos.push({
      id: id,
      todoText: todoText,
      completed: false
    })
  },
  changeTodo: function (position, todoText) {
    this.todos[position].todoText = todoText
  },
  deleteTodo: function (position) {
    this.todos.splice(position, 1)
  },
  toggleCompleted: function (position) {
    let todo = this.todos[position]
    if (todo.completed === true) {
      todo.completed = false
    } else {
      todo.completed = true
    }
  },
  toggleAll: function () {
    let totalTodos = this.todos.length
    let completedTodos = 0
    this.todos.forEach(todo => {
      if (todo.completed) completedTodos++;
    })
    this.todos.forEach(todo => {
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    })
  }
}

var handlers = {
  this: e => e,
  toggleAll: function () {
    todoList.toggleAll()
    view.displayTodos()
  },
  addTodo: function () {
    let inputTodo = $('inputTodo')
    let id = todoList.todos.length
    let pos = todoList.todos.map(e => e.todoText).indexOf(inputTodo.value)
    if (inputTodo.value === '') {
      alert('enter a name for the to-do')
    } else if(pos > -1){
        alert('"'+inputTodo.value+'" is already on the to-do list') 
    } else {
      todoList.addTodo(id, inputTodo.value)
      inputTodo.value = ''
      view.displayTodos()
    }
  },
  editTodo: function (e) {
    let todo = e.parentNode.querySelector('span')
    let str = todo.innerText
    let pos = todoList.todos.map(e => e.todoText).indexOf(str)
    inputEdit = e.parentNode.querySelector('.inputEdit')
    todo.classList.toggle('hide')
    inputEdit.classList.toggle('hide')
    if (inputEdit.value === '') {
      inputEdit.value = todo.innerText
    } else {
      todoList.changeTodo(pos, inputEdit.value)
      view.displayTodos()
    }
  },
  deleteTodo: function (e) {
    let todo = e.parentNode.querySelector('span')
    let str = todo.innerText
    let pos = todoList.todos.map(e => e.todoText).indexOf(str);
    todoList.deleteTodo(pos)
    view.displayTodos()
  },
  completeTodo: function (e) {
    let todo = e.parentNode.querySelector('span')
    let str = todo.innerText
    let pos = todoList.todos.map(e => e.todoText).indexOf(str)
    todoList.toggleCompleted(pos)
    view.displayTodos()
  }
}

let view = {
  displayTodos: function () {
    let ul = document.querySelector('.todoList')
    ul.innerHTML = ''

    todoList.todos.forEach( todo => {

      let completetionStatus = ''
        // create todo
        let span = create('span')
        span.classList.add('todoText')
        let li = create('li')
        span.textContent = todo.todoText
        li.classList.add('todo')
        li.id = ''
        li.id = todo.id

      // check if todo is completed
        let checkBox = create('input')
        checkBox.setAttribute('type','checkbox')
        checkBox.classList.add('checkBox')

        if (todo.completed === true) {
          checkBox.checked = true
          if (!span.classList.contains('completed')){
            span.classList.add('completed')
          }
        } else {
          checkBox.checked = false
          if (span.classList.contains('completed')){
            span.classList.remove('completed')
          }
        
        }

      //delete btn
      let btnDelete = create('button')
      btnDelete.classList.add('button')
      btnDelete.textContent = 'delete'
      btnDelete.classList.add('btnDelete')
      btnDelete.setAttribute("onclick", 'handlers.deleteTodo(this)')

      //toggle button
      let btnToggle = create('button')

      btnToggle.classList.add('toggle')
      btnToggle.setAttribute("onclick", 'handlers.completeTodo(this)')

      //edit button
      let btnEdit = create('button')
      btnEdit.classList.add('button')
      btnEdit.textContent = 'edit'
      btnEdit.classList.add('edit')
      btnEdit.setAttribute("onclick", 'handlers.this(this); handlers.editTodo(this)')

      //edit input
      let inputEdit = create('input')
      inputEdit.id = 'inputEdit'
      inputEdit.classList.add('input')
      inputEdit.classList.add('inputEdit')
      inputEdit.classList.toggle('hide')

      //append to-do item
      ul.appendChild(li)
      let liTodo = $(todo.id)
      liTodo.appendChild(checkBox)
      liTodo.appendChild(span)
      liTodo.appendChild(inputEdit)
      liTodo.appendChild(btnDelete)
      liTodo.appendChild(btnEdit)
    })
  }
}

document.addEventListener('keypress', function (event) {
  let inputTodo = $('inputTodo')
  if (event.keyCode === 13 || event.which === 13) {
    if (inputTodo === document.activeElement) {
      handlers.addTodo()
    }
    if (inputEdit === document.activeElement){
      handlers.editTodo(handlers.editTodo(event.target))
    }
  }
})

document.addEventListener('dblclick', function(event){
  let e = event.target
  let parent = e.parentNode
  if(parent.classList.contains('todo')){
    handlers.editTodo(parent)
  }
})

document.addEventListener( 'click', function(event) {
  let e = event.target
  let parent = e.parentNode
    if(e.classList.contains('checkBox')) {
      handlers.completeTodo(e)
    }
});

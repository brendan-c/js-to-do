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
    // Count # of completed todos
    for (let i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++
      }
    }
    // Case 1: If everythings true, make everything false
    if (completedTodos === totalTodos) {
      for (let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false
      }
    } else {
      for (let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true
      }
    }

  }
}

var handlers = {
  toggleAll: function () {
    todoList.toggleAll()
    view.displayTodos()
  },
  addTodo: function () {
    let inputTodo = document.getElementById('inputTodo')
    let id = todoList.todos.length
    if (inputTodo.value !== '') {
      todoList.addTodo(id, inputTodo.value)
      inputTodo.value = ''
      view.displayTodos()
    } else {
      alert('enter a name for the to-do')
    }
  },
  changeTodo: function () {
    let inputChangePosition = document.getElementById('inputChangePosition')
    let inputChangeText = document.getElementById('inputChangeText')
    todoList.changeTodo(inputChangePosition.valueAsNumber, inputChangeText.value)
    inputChangePosition.value = ''
    inputChangeText.value = ''
    view.displayTodos()
  },
  changeThisTodo: function (e) {
    let pos, str
    todo = e.parentNode.querySelector('span')
    str = todo.innerText
    pos = todoList.todos.map(function (e) {
      return e.todoText
    }).indexOf(str)
    console.log(pos, str)

    inputEdit = e.parentNode.querySelector('.inputEdit')
    inputEdit.classList.toggle('hide')
    todo.classList.toggle('hide')
    if (inputEdit.value === '') {
      inputEdit.value = todo.innerText
    } else {
      todoList.changeTodo(pos, inputEdit.value)
      view.displayTodos()
    }
  },

  deleteTodo: function () {
    let inputDeletePosition = document.getElementById('inputDeletePosition')
    todoList.deleteTodo(inputDeletePosition.valueAsNumber)
    inputDeletePosition.value = ''
    view.displayTodos()
  },

  deleteThisTodo: function (e) {
    let pos, str

    todo = e.parentNode.querySelector('span')
    str = todo.innerText


    pos = todoList.todos.map(function (e) {
      return e.todoText;
    }).indexOf(str);
    console.log(pos, str)
    todoList.deleteTodo(pos)
    view.displayTodos()
  },

  toggleCompleted: function () {
    let inputTogglePosition = document.getElementById('inputTogglePosition')
    todoList.toggleCompleted(inputTogglePosition.valueAsNumber)
    inputTogglePosition.value = ''
    view.displayTodos()
  },

  toggleThisTodo: function (e) {
    let pos, str
    todo = e.parentNode.querySelector('span')
    str = todo.innerText
    pos = todoList.todos.map(function (e) {
      return e.todoText
    }).indexOf(str)
    console.log(pos, str)
    todoList.toggleCompleted(pos)
    view.displayTodos()
  }
}

let view = {
  displayTodos: function () {
    let ul = document.querySelector('.todoList')
    ul.innerHTML = ''
    for (let i = 0; i < todoList.todos.length; i++) {
      let todo = todoList.todos[i]
      let completetionStatus = ''
      // get current todo item

      // check if todo is completed
      if (todo.completed === true) {
        completetionStatus = '(x) '
      } else {
        completetionStatus = '( ) '
      }

      // create todo
      let span = document.createElement('span')
      span.classList.add('todoText')
      let li = document.createElement('li')
      li.textContent = completetionStatus
      span.textContent = todo.todoText
      li.classList.add('todo')
      li.id = ''
      li.id = todo.id

      //delete btn
      let btnDelete = document.createElement('button')
      btnDelete.textContent = 'x'
      btnDelete.classList.add('delete')
      btnDelete.setAttribute("onclick", 'handlers.deleteThisTodo(this)')

      //toggle button
      let btnToggle = document.createElement('button')
      btnToggle.textContent = 'toggle'
      btnToggle.classList.add('toggle')
      btnToggle.setAttribute("onclick", 'handlers.toggleThisTodo(this)')

      //edit button
      let btnEdit = document.createElement('button')
      btnEdit.textContent = 'edit'
      btnEdit.classList.add('edit')
      btnEdit.setAttribute("onclick", 'handlers.changeThisTodo(this)')

      //edit input
      let inputEdit = document.createElement('input')
      inputEdit.classList.add('inputEdit')
      inputEdit.classList.toggle('hide')

      //append to-do item
      ul.appendChild(li)
      let liTodo = document.getElementById(todo.id)
      liTodo.appendChild(span)

      //append controls
      liTodo.appendChild(inputEdit)
      liTodo.appendChild(btnDelete)
      liTodo.appendChild(btnToggle)
      liTodo.appendChild(btnEdit)
    }
  }
}

document.addEventListener('keypress', function (event) {
  let inputTodo = document.getElementById('inputTodo')
  if (event.keyCode === 13 || event.which === 13) {
    if (inputTodo === document.activeElement) {
      handlers.addTodo()
    }
  }
})
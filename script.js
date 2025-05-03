document.addEventListener("DOMContentLoaded", ()=>{

const todoInput = document.getElementById("todo-input");
const addTaskButton = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");

let tasks =  JSON.parse(localStorage.getItem('tasks')) || [];

tasks.forEach( task => renderTasks(task))

addTaskButton.addEventListener('click', ()=>{
  const textInput = todoInput.value.trim();
  if(textInput === "") return;

  let newTask = {
    id: Date.now(),
    completed: false,
    text: textInput
  }

  tasks.push(newTask)
  saveTasks()
  renderTasks(newTask)
  todoInput.value = ""
  console.log(tasks)
})

//render from localstorage

function renderTasks(task){
  const listItems = document.createElement('li')
  listItems.setAttribute('data-id', task.id)
  listItems.innerHTML = `
  <span>${task.text}</span>
  <button>Delete</button>`

  if(task.completed){
    listItems.classList.add('completed')
  }

  listItems.addEventListener('click', (e)=>{
    if(e.target.tagName == "BUTTON") return;
    task.completed = !task.completed
    listItems.classList.toggle('completed')
    saveTasks()
  })

  listItems.querySelector('button').addEventListener('click', (e)=>{
    e.stopPropagation() //prevent toggle firing or bubbling up
    tasks = tasks.filter(t => t.id !== task.id)
    listItems.remove()
    saveTasks()
  })

  todoList.appendChild(listItems)
}
//save into local storage
function saveTasks (){
  localStorage.setItem("tasks", JSON.stringify(tasks))
}


})
const taskBox = document.getElementById('taskBox');
const taskBtn = document.getElementById('taskBtn');
const taskList = document.getElementById('taskList');


let editTask = null;

const addTask = () => {
  //alert("task added successfully");
  const inputText = taskBox.value.trim();
  if (inputText.length <= 0) {
    alert('Please enter a task');
    return;
  }

  if (taskBtn.value === "Edit Task") {
    editLocalTasks(editTask.target.previousElementSibling.innerHTML);
    editTask.target.previousElementSibling.innerHTML = inputText;
    taskBtn.value = "Add Task"
    taskBox.value = "";
  }

  else {

    const li = document.createElement('li');
    const p = document.createElement('p');
    p.innerHTML = inputText;
    li.appendChild(p);


    const editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';
    editBtn.classList.add('btn', 'editBtn');
    li.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.classList.add('btn', 'deleteBtn');
    li.appendChild(deleteBtn);



    taskList.appendChild(li);
    taskBox.value = '';

    saveLocalTasks(inputText);
  }
}

const updateTask = (e) => {

  if (e.target.innerHTML === "Delete") {
    taskList.removeChild(e.target.parentElement);
    deleteLocalTasks(e.target.parentElement);
  }

  if (e.target.innerHTML === "Edit") {
    taskBox.value = e.target.previousElementSibling.innerHTML;
    taskBox.focus();
    taskBtn.value = "Edit Task";
    editTask = e;
  }
}

const saveLocalTasks = (task) => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  //console.log(tasks);
}
const getLocalTasks = (task) => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(task => {
      const li = document.createElement('li');
      const p = document.createElement('p');
      p.innerHTML = task;
      li.appendChild(p);


      const editBtn = document.createElement('button');
      editBtn.innerText = 'Edit';
      editBtn.classList.add('btn', 'editBtn');
      li.appendChild(editBtn);

      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'Delete';
      deleteBtn.classList.add('btn', 'deleteBtn');
      li.appendChild(deleteBtn);



      taskList.appendChild(li);
    })
  }
}
const deleteLocalTasks = (task) => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  let taskText = task.children[0].innerHTML;
  let taskIndex = tasks.indexOf(taskText);
  tasks.splice(taskIndex, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
const editLocalTasks = (task) => {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  let taskIndex = tasks.indexOf(task);
  tasks[taskIndex] = taskBox.value;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
document.addEventListener('DOMContentLoaded',getLocalTasks);
taskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', updateTask);
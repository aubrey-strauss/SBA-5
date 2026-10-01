
//1. Create the HTML Structure 
//1.1 
//Create input fields for the task name, category, deadline, and an initial status (e.g., “In Progress”). 
let taskName = document.getElementById("taskName");
let taskCategory = document.getElementById("taskCategory");
let taskDeadline = document.getElementById("taskDeadline");
let taskStatus = document.getElementById("taskStatus");


//1.2 
//Include an “Add Task” button that will add the task to the task list. 
let addTaskButton = document.getElementById("addTaskButton");

// Store all tasks in an array
let tasks = [];


// Load tasks from local storage
let savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
  tasks = JSON.parse(savedTasks);
}


addTaskButton.addEventListener("click", function () {

  let taskText = taskName.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  //1.3 
  //Each task should be stored as an object with properties such as task name, category, deadline, and status. 
  let newTask = {
    name: taskName.value.trim(),
    category: taskCategory.value.trim(),
    deadline: taskDeadline.value,
    status: taskStatus.value
  };

  //1.4 
  //Add the task object to an array that holds all tasks. 
  tasks.push(newTask);

  keepTasks();

  displayTasks();

  // Clear the input fields
  taskName.value = "";
  taskCategory.value = "";
  taskDeadline.value = "";
  taskStatus.value = "Not Started";
});

//2.1 
//Create an HTML structure (such as an unordered list or table) to display the task list. 
let taskList = document.getElementById("taskList");

//2.2 
//For each task, display the task name, category, deadline, and status. 


//2.3 
//Dynamically update the task list in the browser each time a new task is added or a status is updated. 
function displayTasks() {

  // Clear the current task list
  taskList.innerHTML = "";

  // Check each task for overdue status
  tasks.forEach(function (task) {
    checkOverdue(task);
  });

  // Display each task
  tasks.forEach(function (task, index) {

    // Create a list item
    let listItem = document.createElement("li");

    // Display task name
    let taskTitle = document.createElement("strong");
    taskTitle.textContent = task.name;

    // Display category
    let categoryText = document.createElement("span");
    categoryText.textContent =
      " | Category: " + (task.category || "None");

    // Display deadline
    let deadlineText = document.createElement("span");
    deadlineText.textContent =
      " | Deadline: " + (task.deadline || "None");

    // Create status dropdown
    let statusSelect = document.createElement("select");
    statusSelect.classList.add("updateStatus");
    statusSelect.dataset.index = index;

    // Status options
    let statuses = [
      "Not Started",
      "In Progress",
      "Completed",
      "Overdue"
    ];

    statuses.forEach(function (status) {

      let option = document.createElement("option");

      option.value = status;
      option.textContent = status;

      if (status === task.status) {
        option.selected = true;
      }

      statusSelect.appendChild(option);
    });

    // Add task information to the list item
    listItem.appendChild(taskTitle);
    listItem.appendChild(categoryText);
    listItem.appendChild(deadlineText);
    listItem.appendChild(statusSelect);


    // Add the list item to the task list
    taskList.appendChild(listItem);
  });

  // Save changes
  keepTasks();
}

//A dropdown or buttons to filter tasks by status or category. 
let filterStatus = document.getElementById("filterStatus");

//4.2 
//Provide a dropdown or set of buttons for users to choose a filter. 
filterStatus.addEventListener("change", function () {

  let filterValue = filterStatus.value;
  displayFilteredTasks(filterValue);
});

//3. Updating Task Status 
//3.1 
//Allow users to update the status of tasks (e.g., “In Progress,” “Completed”) via a dropdown or button./ 
taskList.addEventListener("change", function (event) {

  if (event.target.classList.contains("updateStatus")) {
    let taskIndex = event.target.dataset.index;
    tasks[taskIndex].status = event.target.value;
    keepTasks();
    displayFilteredTasks(filterStatus.value);
  }
});

//3.2 
//Automatically check each task’s deadline and mark tasks as “Overdue” if the current date has passed the deadline. 
function checkOverdue(task) {
  if (!task.deadline) {
    return;
  }

  let now = new Date();
  let deadline = new Date(task.deadline);

  if (task.status !== "Completed" && now > deadline) {
    task.status = "Overdue";
  }
}

//4. Filtering Tasks 
//4.1 
//Add functionality to filter tasks by category or status (e.g., show only “Completed” tasks or tasks under the “Work” category). 
function filterTasks(filter) {
  if (filter === "All") {
    return tasks;
  }

  if (filter === "Overdue") {
    return tasks.filter(function (task) {
      return task.status === "Overdue";
    });
  }

  return tasks.filter(function (task) {
    return task.status === filter;
  });
}

//4.3 
//When a filter is selected, only display the tasks that match the selected category or status. 
function displayFilteredTasks(filter) {
  taskList.innerHTML = "";

  let filteredTasks = filterTasks(filter);

  filteredTasks.forEach(function (task) {

    let taskIndex = tasks.indexOf(task);
    let listItem = document.createElement("li");
    let taskTitle = document.createElement("strong");

    taskTitle.textContent = task.name;

    let categoryText = document.createElement("span");
    categoryText.textContent =
      " | Category: " + (task.category || "None");

    let deadlineText = document.createElement("span");
    deadlineText.textContent =
      " | Deadline: " + (task.deadline || "None");

    let statusSelect = document.createElement("select");
    statusSelect.classList.add("updateStatus");
    statusSelect.dataset.index = taskIndex;

    let statuses = [
      "Not Started",
      "In Progress",
      "Completed",
      "Overdue"
    ];

    statuses.forEach(function (status) {

      let option = document.createElement("option");
      option.value = status;
      option.textContent = status;

      if (status === task.status) {
        option.selected = true;
      }

      statusSelect.appendChild(option);
    });

    listItem.appendChild(taskTitle);
    listItem.appendChild(categoryText);
    listItem.appendChild(deadlineText);
    listItem.appendChild(statusSelect);

    taskList.appendChild(listItem);
  });
}

//5.Persisting Task Data with Local Storage 
//5.1 
//Use local storage to save the current state of the task list so that tasks are restored when the page is refreshed. 
function keepTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//5.2 
//Ensure that task data (including name, category, deadline, and status) is stored and retrieved correctly. 
function loadTasks() {
  let savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
}

//Write the JavaScript Code

//Use an array to store tasks, each represented by an object.

// The tasks array is created above.


//Write functions to add tasks, update task status, check overdue tasks, and filter tasks.

// These functions are created above.


//Use DOM manipulation to display the task list dynamically.

// displayTasks() and displayFilteredTasks() handle this.


//Implement local storage to persist task data.

// keepTasks() and loadTasks() handle this.



//Test Your Application

//Add multiple tasks and ensure they are displayed correctly.

//Test the “Update Status” functionality to ensure tasks can be marked as


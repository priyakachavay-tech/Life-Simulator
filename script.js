//Get Start

let startButton = document.getElementById("btn");

let goalSection = document.getElementById("Goal");

startButton.addEventListener("click" , function(){

    goalSection.scrollIntoView({
        behavior: "smooth"

    });
});

//Select Goal 

let goalButtons = document.querySelectorAll("[data-goal]");

let codingSection = document.getElementById("coding");

let studiesSection = document.getElementById("studies");

let timeSection = document.getElementById("time");

//Hide Desicion

function hideAllSections(){

    codingSection.hidden = true;

    studiesSection.hidden = true;

    timeSection.hidden = true;

}

//Goal Section

goalButtons.forEach(function(button){

    button.addEventListener("click", function(){

        let goal = button.getAttribute("data-goal");

        hideAllSections();

        if(goal === "Learn Coding"){

            codingSection.hidden = false;

            codingSection.scrollIntoView({

                behavior: "smooth"
            });
        }

        else if(goal === "Improve Studies"){

            studiesSection.hidden = false;

            studiesSection.scrollIntoView({

                behavior: "smooth"
            });
        }

        else if (goal === "Time Management") {

            timeSection.hidden = false;

            timeSection.scrollIntoView({
                behavior: "smooth"
            });

        }


    });
});

// Select Decision

let decisionButtons = document.querySelectorAll("[data-decision]");

let decisionDetailsSection = document.getElementById("decisionDetails");

let chosenDecision = document.getElementById("chosenDecision");

let decisionMessage = document.getElementById("decisionMessage");


decisionButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        let decision = button.getAttribute("data-decision");

        chosenDecision.textContent = decision;

        decisionMessage.textContent =
            "You have selected this decision. Now you can plan your daily tasks.";

        decisionDetailsSection.hidden = false;

        decisionDetailsSection.scrollIntoView({
            behavior: "smooth"
        });

    });

});

let continueButton = document.getElementById("continueTask");

let taskSection = document.getElementById("Tasks");

continueButton.addEventListener("click", function(){

    taskSection.scrollIntoView({

        behavior: "smooth"
    });
});

let taskInput = document.getElementById("taskInput");

let addTaskButton = document.getElementById("addTaskBtn");

let taskList = document.getElementById("taskList");

addTaskButton.addEventListener("click", function(){

    let task = taskInput.value.trim();

    if (task === ""){
        alert("Please enter a task");
        return;
    }

    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    let taskText = document.createElement("span");
    taskText.textContent = task;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    updateDashboard();
    saveTasks();

    taskInput.value = "";
});

// STEP 7: Complete Task and Delete Task

taskList.addEventListener("change", function(event) {

    if (event.target.type === "checkbox") {

        let taskItem = event.target.nextElementSibling;

        if (event.target.checked) {
            taskItem.style.textDecoration = "line-through";
            taskItem.style.color = "gray";
        } else {
            taskItem.style.textDecoration = "none";
            taskItem.style.color = "black";
        }

        saveTasks();
        updateDashboard();
    }

});


taskList.addEventListener("click", function(event) {

    if (event.target.tagName === "BUTTON") {

        let taskItem = event.target.parentElement;

        taskItem.remove();
    }

    updateDashboard();

});

let totalTasks = document.getElementById("totalTasks");
let completedTasks = document.getElementById("completedTasks");
let pendingTasks = document.getElementById("pendingTasks");
let progressBarFill = document.getElementById("progressBarFill");
let progressText = document.getElementById("progressText");

// Update Dashboard
function updateDashboard() {
    let total = taskList.querySelectorAll("li").length;

    let completed = taskList.querySelectorAll(
        "input[type='checkbox']:checked"
    ).length;

    let pending = total - completed;

    let percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;

    progressBarFill.style.width = percentage + "%";
    progressText.textContent = percentage + "% Completed";
}

// Save Tasks in Local Storage
function saveTasks() {
    let tasks = [];

    taskList.querySelectorAll("li").forEach(function(li) {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector("input").checked
        });
    });

    localStorage.setItem("lifeSimulatorTasks", JSON.stringify(tasks));
}

// Load Saved Tasks
let savedTasks = localStorage.getItem("lifeSimulatorTasks");

if (savedTasks !== null) {
    taskList.innerHTML = "";

    JSON.parse(savedTasks).forEach(function(task) {
        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        let taskText = document.createElement("span");
        taskText.textContent = task.text;

        if (task.completed) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "gray";
        }

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

updateDashboard();

// Back To Top Button
let topButton = document.getElementById("topButton");

// Show button on scroll
window.addEventListener("scroll", function() {
    if (window.scrollY > 200) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
});

// Scroll to top on click
topButton.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");

    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete-btn">Delete</button>
    `;

    li.querySelector(".task-text").addEventListener("click", () => toggleComplete(li));
    li.querySelector(".delete-btn").addEventListener("click", () => deleteTask(li));

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}

function deleteTask(li) {
    li.remove();
    saveTasks();
}

function toggleComplete(li) {
    li.classList.toggle("completed");
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector(".task-text").innerText,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    taskList.innerHTML = ""; // Clear list to avoid duplicates

    storedTasks.forEach(task => {
        let li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <button class="delete-btn">Delete</button>
        `;

        li.querySelector(".task-text").addEventListener("click", () => toggleComplete(li));
        li.querySelector(".delete-btn").addEventListener("click", () => deleteTask(li));

        taskList.appendChild(li);
    });
}

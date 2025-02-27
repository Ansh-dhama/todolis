document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
    const taskCounter = document.getElementById("task-counter");
    const progressFill = document.getElementById("progress-fill");

    let tasks = [];

    // Add Task
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        tasks.push({ text: taskText, completed: false });
        updateTasks();
        taskInput.value = "";
    });

    // Update Task List & Progress
    function updateTasks() {
        taskList.innerHTML = "";
        let completedTasks = 0;
        tasks.forEach((task, index) => {
            const li = document.createElement("li");

            // Checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("task-checkbox");
            checkbox.checked = task.completed;
            checkbox.addEventListener("click", () => {
                task.completed = !task.completed;
                updateTasks();
            });

            // Task Text
            const taskText = document.createElement("span");
            taskText.textContent = task.text;
            taskText.classList.toggle("completed", task.completed);

            // Delete Button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "X";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.onclick = () => {
                tasks.splice(index, 1);
                updateTasks();
            };

            li.appendChild(checkbox);
            li.appendChild(taskText);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);

            if (task.completed) completedTasks++;
        });

        updateProgress(completedTasks, tasks.length);
    }

    // Update Progress Bar & Counter
    function updateProgress(completed, total) {
        taskCounter.textContent = `${completed}/${total}`;
        let progressPercentage = total === 0 ? 0 : (completed / total) * 100;
        progressFill.style.width = `${progressPercentage}%`;

        // If all tasks are completed, celebrate
        if (completed === total && total > 0) {
            celebrate();
        }
    }

    // Celebration Animation
    function celebrate() {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
        });
    }
});

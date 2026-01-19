const container = document.querySelector('.tasks');
const input = container.querySelector('.tasks__input');
const newTask = container.querySelector('.tasks__list');

function saveToLocal() {
    const tasks = Array.from(newTask.querySelectorAll('.task')).map(task => {
        return task.querySelector('.task__title').textContent.trim();
    });
    localStorage.setItem(`tasks`, JSON.stringify(tasks));
}

function loadTasks() {
    const saved = localStorage.getItem('tasks');
    const tasks = saved ? JSON.parse(saved) : [];
    tasks.forEach(text => {
        if (!text.trim()) return;
        newTask.insertAdjacentHTML('beforeend', `
        <div class="task">
            <div class="task__title">
                ${text}
            </div>
            <a href="#" class="task__remove">&times;</a>
        </div>
        `);
    });
}

function saveTasks() {
    newTask.insertAdjacentHTML('beforeend', `
    <div class="task">
        <div class="task__title">
            ${input.value}
        </div>
        <a href="#" class="task__remove">&times;</a>
    </div>
    `);
    saveToLocal();
}

input.addEventListener('keydown', event => {
    if (event.key === 'Enter' && input.value.trim() !== '') {
        event.preventDefault();
        saveTasks();
    };
});
document.addEventListener('click', event => {
    if (event.target.classList.contains('task__remove')) {
        event.preventDefault();
        event.target.closest('.task').remove();
        saveToLocal();
    };
    if (event.target.classList.contains('tasks__add')) {
        event.preventDefault();
        saveTasks();
    }
})
loadTasks();
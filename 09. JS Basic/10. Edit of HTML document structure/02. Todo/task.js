const DATA_KEY = 'netologyTasks';

class HandlerTasks {

    constructor(container) {
        this.tasksFormControl = container.querySelector('.tasks__control');
        this.tasksInput = container.querySelector('.tasks__input');
        this.tasksList = container.querySelector('.tasks__list');
        this.tasks = [];
        this.readTasks();
        this.registerEvents();
    }

    readTasks() {

        const data = window.localStorage;
        const res = data.getItem(DATA_KEY);
        const activeTasks = res ? JSON.parse(res) : [];

        activeTasks.forEach(text => this.addTask(text));
    }

    saveTasks() {

        const data = window.localStorage;
        const activeTasks = this.tasks.filter((value) => {
            return value;
        })

        data.setItem(DATA_KEY, JSON.stringify(activeTasks));
    }

    registerEvents() {

        let handler = this;

        this.tasksFormControl.addEventListener('submit', function (event) {
            handler.addTask(handler.tasksInput.value);
            event.preventDefault();
        });
    }

    createTaskElement(text) {

        const taskElement = document.createElement('div');
        taskElement.className = 'task';

        const taskTitle = `<div class="task__title">${text}</div>`
        const taskRemove = '<a href="#" class="task__remove" title="Удалить задачу">&times;</a>';

        taskElement.insertAdjacentHTML('afterBegin', taskTitle);
        taskElement.insertAdjacentHTML('beforeEnd', taskRemove);

        return taskElement;
    }

    addTask(taskDescription) {

        if (taskDescription.trim().length <= 0) {
            console.log('return');
            return;
        }

        const task = this.createTaskElement(taskDescription);

        this.tasksList.insertAdjacentElement('beforeEnd', task);
        this.tasks.push(taskDescription);
        this.saveTasks();

        const index = this.tasks.length - 1;

        task.querySelector('.task__remove').addEventListener('click', () => {
            task.remove();
            delete this.tasks[index];
            this.saveTasks();
        })

        this.tasksInput.value = '';
    }
}

new HandlerTasks(document.getElementById('tasks'));
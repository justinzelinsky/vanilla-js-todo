const EXISTING_TODO_LIST_KEY = 'existingTodoListKey';

const getSavedTodoItems = () =>
  JSON.parse(localStorage.getItem(EXISTING_TODO_LIST_KEY)) || [];

document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.querySelector('.todo-add button');
  const todoInput = document.querySelector('.todo-add input');
  const todoList = document.querySelector('.todo-list');

  const addItem = todoTask => {
    const index = todoList.childElementCount;
    const todoSpan = document.createElement('span');
    todoSpan.innerText = todoTask;

    const todoRemoveButton = document.createElement('button');
    todoRemoveButton.innerText = 'Remove';
    todoRemoveButton.addEventListener('click', function() {
      removeItem(index);
    });

    const todoNode = document.createElement('li');
    todoNode.setAttribute('data-index', index);
    todoNode.appendChild(todoSpan);
    todoNode.appendChild(todoRemoveButton);

    todoList.appendChild(todoNode);

    const existingItems = getSavedTodoItems();
    existingItems.push({
      todoTask,
      index
    });
    localStorage.setItem(EXISTING_TODO_LIST_KEY, JSON.stringify(existingItems));
  };

  const removeItem = index => {
    const itemToRemove = todoList.querySelector(`li[data-index="${index}"]`);
    itemToRemove.remove();

    const existingItems = getSavedTodoItems();

    const cleanedExistingItems = existingItems.filter(
      item => item.index !== index
    );

    localStorage.setItem(
      EXISTING_TODO_LIST_KEY,
      JSON.stringify(cleanedExistingItems)
    );
  };

  addButton.addEventListener('click', () => {
    const { value } = todoInput;
    todoInput.value = '';
    addItem(value);
  });

  todoInput.addEventListener('keypress', event => {
    if (event.keyCode === 13) {
      const { value } = todoInput;
      todoInput.value = '';
      addItem(value);
    }
  });

  // Load existing todo items
  const existingItems = getSavedTodoItems();

  if (existingItems) {
    const newExistingItems = [];

    existingItems.forEach((item, index) => {
      const { todoTask } = item;
      addItem(todoTask);
      newExistingItems.push({
        todoTask,
        index
      });
    });

    localStorage.setItem(
      EXISTING_TODO_LIST_KEY,
      JSON.stringify(newExistingItems)
    );
  }
});

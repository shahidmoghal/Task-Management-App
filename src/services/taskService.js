// src/services/taskService.js

// Simulate a simple in-memory database
let tasks = [];

export const getTasks = () => {
  return tasks;
};

export const addTask = (task) => {
  tasks.push(task);
  return tasks;
};

export const updateTask = (id, updatedTask) => {
  tasks = tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task));
  return tasks;
};

export const deleteTask = (id) => {
  tasks = tasks.filter(task => task.id !== id);
  return tasks;
};
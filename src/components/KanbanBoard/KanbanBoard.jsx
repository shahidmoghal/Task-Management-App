import React, { useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Column from './Column';
import TaskForm from '../TaskForm/TaskForm';
import SearchBar from '../SearchBar/SearchBar';
import useDebounce from '../../hooks/useDebounce';
import { auth, signOut } from '../../firebase';


const KanbanBoard = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [logs, setLogs] = useState([]); // Activity Log State

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const handleLogout = async () => {
    await signOut(auth);
  };

  const logActivity = (action, task) => {
    const logEntry = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      user: 'User1', // Change this dynamically if needed
      action,
      taskTitle: task.title
    };
    setLogs([logEntry, ...logs]);
  };

  const addTask = (task) => {
    const newTask = { 
      ...task, 
      id: Date.now(), 
      status: 'To Do', 
      createdBy: 'User1',
      priority: task.priority || 'Medium'
    };
    setTasks([...tasks, newTask]);
    logActivity('Task Created', newTask);
  };

  const moveTask = (id, status) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        logActivity(`Moved to ${status}`, task);
        return { ...task, status };
      }
      return task;
    }));
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
    logActivity('Task Updated', updatedTask);
  };

  const removeTask = (id) => {
    const deletedTask = tasks.find(task => task.id === id);
    setTasks(tasks.filter(task => task.id !== id));
    logActivity('Task Deleted', deletedTask);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
       <h2 className=' mb-2'>Fill the Form to Add task</h2>
        <TaskForm onSubmit={addTask} />
        <h2 className=' mt-4 mb-2'>Search by below Criteria</h2>
        <SearchBar
          onSearch={setSearchTerm}
          onFilter={setFilterPriority}
          onSort={setSortOrder}
        />
        <div className="flex justify-around mt-4">
          <Column status="To Do" tasks={tasks.filter(task => task.status === 'To Do')} moveTask={moveTask} removeTask={removeTask} updateTask={updateTask} />
          <Column status="In Progress" tasks={tasks.filter(task => task.status === 'In Progress')} moveTask={moveTask} removeTask={removeTask} updateTask={updateTask} />
          <Column status="Done" tasks={tasks.filter(task => task.status === 'Done')} moveTask={moveTask} removeTask={removeTask} updateTask={updateTask} />
        </div>

        {/* Activity Log Section */}
        <div className="mt-6 p-4 bg-gray-200 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Activity Logs</h2>
          <ul className="list-disc pl-4">
            {logs.map(log => (
              <li key={log.id} className="text-sm mb-1">
                <strong>{log.timestamp}</strong> - {log.user} {log.action} **"{log.taskTitle}"**
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
      <button onClick={handleLogout} className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
    </DndProvider>
    
  );
};

export default KanbanBoard;

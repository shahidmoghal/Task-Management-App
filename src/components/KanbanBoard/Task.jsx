import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const Task = ({ task, removeTask, updateTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({ ...task });

  const handleUpdate = () => {
    updateTask(task.id, updatedTask);
    setIsEditing(false);
  };

  return (
    <div
      ref={drag}
      className={`p-2 mb-2 bg-white rounded shadow ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedTask.title}
            onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
            className="border p-1 w-full mb-2"
          />
          <textarea
            value={updatedTask.description}
            onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
            className="border p-1 w-full mb-2"
          />
          <input
            type="date"
            value={updatedTask.dueDate}
            onChange={(e) => setUpdatedTask({ ...updatedTask, dueDate: e.target.value })}
            className="border p-1 w-full mb-2"
          />
          <select
            value={updatedTask.priority}
            onChange={(e) => setUpdatedTask({ ...updatedTask, priority: e.target.value })}
            className="border p-1 w-full mb-2"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button onClick={handleUpdate} className="p-1 bg-green-500 text-white rounded mr-2">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="p-1 bg-gray-500 text-white rounded">
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h3 className="font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p>{task.dueDate}</p>
          <p>{task.priority}</p>
          <button onClick={() => setIsEditing(true)} className="mt-2 p-1 bg-blue-500 text-white rounded mr-2">
            Update
          </button>
          <button onClick={() => removeTask(task.id)} className="p-1 bg-red-500 text-white rounded">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Task;

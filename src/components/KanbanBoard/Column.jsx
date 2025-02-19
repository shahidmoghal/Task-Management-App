import React from 'react';
import Task from './Task';
import { useDrop } from 'react-dnd';

const Column = ({ status, tasks, moveTask, removeTask, updateTask  }) => {  // Add removeTask to props
  

  const [drop] = useDrop({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, status),
  });

  return (
    <div  className="flex-1 m-2 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">{status}</h2>
      {tasks.map(task => (
        <Task key={task.id} task={task} removeTask={removeTask} updateTask={updateTask} />
      ))}
    </div>
  );
};

export default Column;

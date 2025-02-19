import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema } from '../../utils/validationSchema';

const TaskForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(taskSchema),
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <input {...register('title')} placeholder="Task Title" className="w-full p-2 border rounded" />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      <textarea {...register('description')} placeholder="Description" className="w-full p-2 border rounded" />
      <input type="date" {...register('dueDate')} className="w-full p-2 border rounded" />
      <select {...register('priority', { required: true })} className="w-full p-2 border rounded">
  <option value="">Set Task Priority</option>
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High">High</option>
</select>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
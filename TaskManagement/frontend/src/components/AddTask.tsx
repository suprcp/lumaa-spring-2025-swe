import React, { useState } from 'react';
import { createTask } from '../api';

const AddTask = ({ token, onTaskAdded }: { token: string; onTaskAdded: () => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleAddTask = async () => {
    if (!title.trim()) {
      setError('Title cannot be empty');
      return;
    }

    try {
      await createTask({ title, description });

      setTitle('');
      setDescription('');
      setError('');

      onTaskAdded();
    } catch (err) {
      console.error('Failed to add task:', err);
      setError('Failed to add task. Please try again.');
    }
  };

  return (
    <div className="add-task-container">
      {error && <div className="error-message">{error}</div>}
      <div className="add-task-inputs">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
            setError('');
          }}
        />
        <input
          type="text"
          placeholder="Task Description (Optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          disabled={!title.trim()}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTask;
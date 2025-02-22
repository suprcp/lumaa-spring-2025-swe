import React, { useState } from 'react';

interface TaskItemProps {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  onTaskUpdated: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  description,
  isComplete,
  onTaskUpdated
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [error, setError] = useState('');

  const handleUpdate = async () => {
    if (!editTitle.trim()) {
      setError('Title cannot be empty');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update task');
      }

      onTaskUpdated();
      setIsEditing(false);
      setError('');
    } catch (error) {
      console.error('Update task error:', error);
      setError(error instanceof Error ? error.message : 'Failed to update task');
    }
  };

  const handleToggleComplete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isComplete: !isComplete }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle task completion');
      }

      onTaskUpdated();
    } catch (error) {
      console.error('Toggle complete error:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      onTaskUpdated();
    } catch (error) {
      console.error('Delete task error:', error);
    }
  };

  if (isEditing) {
    return (
      <li className="task-item editing">
        {error && <div className="error-message">{error}</div>}
        <input
          type="text"
          placeholder="Title"
          value={editTitle}
          onChange={(e) => {
            setEditTitle(e.target.value);
            setError('');
          }}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />
        <button onClick={handleUpdate}>Save</button>
        <button onClick={() => {
          setIsEditing(false);
          setError('');
        }}>Cancel</button>
      </li>
    );
  }

  return (
    <li className="task-item">
      <span className="task-content">
        {title} - {description} {isComplete ? '✅' : '❌'}
      </span>
      <div className="task-actions">
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={handleToggleComplete}>
          {isComplete ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;
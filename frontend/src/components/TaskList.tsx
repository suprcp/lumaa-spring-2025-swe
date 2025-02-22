import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api";
import TaskItem from "./TaskItem";
import AddTask from "./AddTask";

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

const TaskList = ({ token }: { token: string }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError("Failed to load tasks. Please try again.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  return (
    <div>
      <h1>Task Management</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <AddTask token={token} onTaskAdded={fetchTasks} />
      {tasks.length === 0 ? (
        <p>No tasks found. Add a new task!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              {...task}
              onTaskUpdated={fetchTasks}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
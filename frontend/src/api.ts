import axios from 'axios';

const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    console.error('Get tasks error:', error);
    throw error;
  }
};

export const createTask = async (task: { title: string; description: string }) => {
  try {
    const response = await api.post('/tasks', task);
    return response.data;
  } catch (error) {
    console.error('Create task error:', error);
    throw error;
  }
};

export const updateTask = async (id: number, update: { isComplete: boolean }) => {
  try {
    const response = await api.put(`/tasks/${id}`, update);
    return response.data;
  } catch (error) {
    console.error('Update task error:', error);
    throw error;
  }
};

export const deleteTask = async (id: number) => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    console.error('Delete task error:', error);
    throw error;
  }
};
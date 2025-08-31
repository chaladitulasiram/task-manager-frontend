import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks';

// Updated to accept a filter string
export const getTasks = (filter) => {
  const params = {};
  // Only add the 'filter' param if it's 'completed' or 'pending'
  if (filter && (filter === 'completed' || filter === 'pending')) {
    params.filter = filter;
  }
  return axios.get(API_URL, { params });
};

export const createTask = (task) => axios.post(API_URL, task);
export const updateTask = (id, task) => axios.put(`${API_URL}/${id}`, task);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
// Add a new function to specifically handle status updates (PATCH request)
export const updateTaskStatus = (id, completed) => axios.patch(`${API_URL}/${id}?completed=${completed}`);
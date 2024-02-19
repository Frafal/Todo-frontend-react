import { apiClient } from './Apiclient';

export const getTodos = (username) => apiClient.get(`${username}/todos`)
export const getTodo = (username, id) => apiClient.get(`${username}/todos/${id}`)
export const deleteTodo = (username,id) => apiClient.delete(`${username}/todos/${id}`)
export const createTodo = (username, todo) => apiClient.post(`${username}/todos`, todo)
export const updateTodo = (username, todo) => apiClient.put(`${username}/todos/${todo.id}`, todo)
import { api, handleResponse, handleError } from "./apiServices";

export const createTask = (token, data) =>
  api(token).post("/api/tasks/", data).then(handleResponse).catch(handleError);

export const getAllTaskList = (token) =>
  api(token).get("/api/tasks/").then(handleResponse).catch(handleError);

export const editTask = (token, id, data) =>
  api(token)
    .put(`/api/tasks/${id}`, data)
    .then(handleResponse)
    .catch(handleError);

export const deleteTask = (token, id) =>
  api(token).delete(`/api/tasks/${id}`).then(handleResponse).catch(handleError);

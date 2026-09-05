import { apiRequest } from "./apiRequest";

export const getUsers = () => apiRequest("/users");

export const getUser = (id) => apiRequest(`/users/${id}`);

export const createUser = (user) =>
  apiRequest("/users", {
    method: "POST",
    body: JSON.stringify(user)
  });

export const updateUser = (id, user) =>
  apiRequest(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(user)
  });

export const activateUser = (id) =>
  apiRequest(`/users/${id}/activate`, { method: "PATCH" });

export const deactivateUser = (id) =>
  apiRequest(`/users/${id}/deactivate`, { method: "PATCH" });

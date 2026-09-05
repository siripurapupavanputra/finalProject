import { apiRequest } from "./apiRequest";

export const getRoles = () => apiRequest("/roles");

export const getRole = (id) => apiRequest(`/roles/${id}`);

export const createRole = (role) =>
  apiRequest("/roles", {
    method: "POST",
    body: JSON.stringify(role)
  });

export const updateRole = (id, role) =>
  apiRequest(`/roles/${id}`, {
    method: "PUT",
    body: JSON.stringify(role)
  });

export const activateRole = (id) =>
  apiRequest(`/roles/${id}/activate`, { method: "PATCH" });

export const deactivateRole = (id) =>
  apiRequest(`/roles/${id}/deactivate`, { method: "PATCH" });

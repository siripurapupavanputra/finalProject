import { apiRequest } from "./apiRequest";

export const getOrganizations = () => apiRequest("/organizations");

export const getOrganization = (id) => apiRequest(`/organizations/${id}`);

export const createOrganization = (organization) =>
  apiRequest("/organizations", {
    method: "POST",
    body: JSON.stringify(organization)
  });

export const updateOrganization = (id, organization) =>
  apiRequest(`/organizations/${id}`, {
    method: "PUT",
    body: JSON.stringify(organization)
  });

export const activateOrganization = (id) =>
  apiRequest(`/organizations/${id}/activate`, { method: "PATCH" });

export const deactivateOrganization = (id) =>
  apiRequest(`/organizations/${id}/deactivate`, { method: "PATCH" });

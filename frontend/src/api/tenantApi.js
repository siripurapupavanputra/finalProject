import { apiRequest } from "./apiRequest";

export const getTenants = () => apiRequest("/tenants");

export const getTenant = (id) => apiRequest(`/tenants/${id}`);

export const createTenant = (tenant) =>
  apiRequest("/tenants", {
    method: "POST",
    body: JSON.stringify(tenant)
  });

export const updateTenant = (id, tenant) =>
  apiRequest(`/tenants/${id}`, {
    method: "PUT",
    body: JSON.stringify(tenant)
  });

export const activateTenant = (id) =>
  apiRequest(`/tenants/${id}/activate`, { method: "PATCH" });

export const deactivateTenant = (id) =>
  apiRequest(`/tenants/${id}/deactivate`, { method: "PATCH" });

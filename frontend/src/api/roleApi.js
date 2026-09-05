const API_URL = `${import.meta.env.VITE_API_URL || "https://final-project-phi-brown.vercel.app"}/api`;

export const getRoles = async () => {
  const response = await fetch(`${API_URL}/roles`);
  if (!response.ok) throw new Error("Failed to fetch roles");
  return response.json();
};

export const getRole = async (id) => {
  const response = await fetch(`${API_URL}/roles/${id}`);
  if (!response.ok) throw new Error("Failed to fetch role");
  return response.json();
};

export const createRole = async (role) => {
  const response = await fetch(`${API_URL}/roles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(role)
  });
  if (!response.ok) throw new Error((await response.json()).message || "Failed to create role");
  return response.json();
};

export const updateRole = async (id, role) => {
  const response = await fetch(`${API_URL}/roles/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(role)
  });
  if (!response.ok) throw new Error((await response.json()).message || "Failed to update role");
  return response.json();
};

export const activateRole = async (id) => {
  const response = await fetch(`${API_URL}/roles/${id}/activate`, { method: "PATCH" });
  if (!response.ok) throw new Error("Failed to activate role");
  return response.json();
};

export const deactivateRole = async (id) => {
  const response = await fetch(`${API_URL}/roles/${id}/deactivate`, { method: "PATCH" });
  if (!response.ok) throw new Error("Failed to deactivate role");
  return response.json();
};

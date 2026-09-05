const API_URL = `${import.meta.env.VITE_API_URL || "https://final-project-phi-brown.vercel.app"}/api`;

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
};

export const getUser = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`);
  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
};

export const createUser = async (user) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  if (!response.ok) throw new Error((await response.json()).message || "Failed to create user");
  return response.json();
};

export const updateUser = async (id, user) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  if (!response.ok) throw new Error((await response.json()).message || "Failed to update user");
  return response.json();
};

export const activateUser = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}/activate`, { method: "PATCH" });
  if (!response.ok) throw new Error("Failed to activate user");
  return response.json();
};

export const deactivateUser = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}/deactivate`, { method: "PATCH" });
  if (!response.ok) throw new Error("Failed to deactivate user");
  return response.json();
};

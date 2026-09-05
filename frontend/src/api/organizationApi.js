const API_URL = `${import.meta.env.VITE_API_URL || "https://final-project-phi-brown.vercel.app"}/api`;

export const getOrganizations = async () => {
  const response = await fetch(`${API_URL}/organizations`);
  if (!response.ok) throw new Error("Failed to fetch organizations");
  return response.json();
};

export const getOrganization = async (id) => {
  const response = await fetch(`${API_URL}/organizations/${id}`);
  if (!response.ok) throw new Error("Failed to fetch organization");
  return response.json();
};

export const createOrganization = async (organization) => {
  const response = await fetch(`${API_URL}/organizations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(organization)
  });
  if (!response.ok) throw new Error((await response.json()).message || "Failed to create organization");
  return response.json();
};

export const updateOrganization = async (id, organization) => {
  const response = await fetch(`${API_URL}/organizations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(organization)
  });
  if (!response.ok) throw new Error((await response.json()).message || "Failed to update organization");
  return response.json();
};

export const activateOrganization = async (id) => {
  const response = await fetch(`${API_URL}/organizations/${id}/activate`, { method: "PATCH" });
  if (!response.ok) throw new Error("Failed to activate organization");
  return response.json();
};

export const deactivateOrganization = async (id) => {
  const response = await fetch(`${API_URL}/organizations/${id}/deactivate`, { method: "PATCH" });
  if (!response.ok) throw new Error("Failed to deactivate organization");
  return response.json();
};

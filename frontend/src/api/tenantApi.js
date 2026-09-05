const API_URL = "https://final-project-phi-brown.vercel.app/api";

export const getTenants = async () => {
  const response = await fetch(`${API_URL}/tenants`);
  if (!response.ok) {
    throw new Error("Failed to fetch tenants");
  }

  return response.json();
};

export const getTenant = async (id) => {
  const response = await fetch(`${API_URL}/tenants/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch tenant");
  }

  return response.json();
};

export const createTenant = async (tenant) => {
  const response = await fetch(`${API_URL}/tenants`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(tenant)
  });

  if (!response.ok) {
    throw new Error("Failed to create tenant");
  }

  return response.json();
};

export const updateTenant = async (id, tenant) => {
  const response = await fetch(
    `${API_URL}/tenants/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tenant)
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update tenant");
  }

  return response.json();
};
export const activateTenant = async (id) => {
  const response = await fetch(
    `${API_URL}/tenants/${id}/activate`,
    {
      method: "PATCH"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to activate tenant");
  }

  return response.json();
};
export const deactivateTenant = async (id) => {
  const response = await fetch(
    `${API_URL}/tenants/${id}/deactivate`,
    {
      method: "PATCH"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to deactivate tenant");
  }

  return response.json();
};
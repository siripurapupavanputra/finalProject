import { API_URL } from "./apiConfig";

export const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {})
    }
  });

  let data = null;
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    data = await response.json();
  } else {
    const text = await response.text();
    data = text || null;
  }

  if (!response.ok) {
    const message =
      data && typeof data === "object" && data.message
        ? data.message
        : `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
};

// One API base URL for the complete frontend.
// In production Vercel uses the deployed backend URL below.
// For local development, create frontend/.env.local with:
// VITE_API_URL=http://localhost:3000

const DEFAULT_API_URL = "https://final-project-phi-brown.vercel.app";

const configuredUrl = import.meta.env.VITE_API_URL?.trim();

export const API_BASE_URL = (configuredUrl || DEFAULT_API_URL).replace(/\/$/, "");
export const API_URL = `${API_BASE_URL}/api`;

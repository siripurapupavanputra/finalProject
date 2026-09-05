const API_URL = "https://final-project-phi-brown.vercel.app/api";

export const getDashboardStats = async () => {
  const response = await fetch(
    `${API_URL}/dashboard/stats`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch dashboard stats"
    );
  }

  return response.json();
};

export const getPlatformHealth = async () => {
  const response = await fetch(
    `${API_URL}/dashboard/health`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch platform health"
    );
  }

  return response.json();
};

export const getAnalytics = async () => {
  const response = await fetch(
    `${API_URL}/dashboard/analytics`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch analytics"
    );
  }

  return response.json();
};

export const getRecentActivities = async () => {
  const response = await fetch(
    `${API_URL}/dashboard/activities`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch activities"
    );
  }

  return response.json();
};
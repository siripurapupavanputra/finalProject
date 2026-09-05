import { apiRequest } from "./apiRequest";

export const getDashboardStats = () => apiRequest("/dashboard/stats");
export const getPlatformHealth = () => apiRequest("/dashboard/health");
export const getAnalytics = () => apiRequest("/dashboard/analytics");
export const getRecentActivities = () => apiRequest("/dashboard/activities");

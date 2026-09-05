const express = require("express");

const router = express.Router();

const {
  dashboardStats,
  platformHealth,
  analytics,
  activities
} = require("../data/dashboard");

// Dashboard statistics
router.get("/stats", (req, res) => {
  res.json(dashboardStats);
});

// Platform health
router.get("/health", (req, res) => {
  res.json(platformHealth);
});

// Analytics
router.get("/analytics", (req, res) => {
  res.json(analytics);
});

// Recent activities
router.get("/activities", (req, res) => {
  res.json(activities);
});
router.get("/", (req, res) => {
  res.json({
    message: "Dashboard API is working",
    endpoints: {
      stats: "/api/dashboard/stats",
      health: "/api/dashboard/health",
      analytics: "/api/dashboard/analytics",
      activities: "/api/dashboard/activities"
    }
  });
});
module.exports = router;
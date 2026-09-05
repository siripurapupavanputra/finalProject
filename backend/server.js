const express = require("express");
const cors = require("cors");

const tenantRoutes = require("./routes/tenantRoute");
const dashboardRoutes = require("./routes/dashboardRoute");
const organizationRoutes = require("./routes/organizationRoute");
const userRoutes = require("./routes/userRoute");
const roleRoutes = require("./routes/roleRoute");

const app = express();

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Super Admin API is running",
    endpoints: {
      dashboard: "/api/dashboard",
      tenants: "/api/tenants",
      organizations: "/api/organizations",
      users: "/api/users",
      roles: "/api/roles"
    }
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "API is healthy" });
});

app.use("/api/tenants", tenantRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;

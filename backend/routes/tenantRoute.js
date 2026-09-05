const express = require("express");
const router = express.Router();

const tenants = require("../data/tenants");

// GET all tenants
router.get("/", (req, res) => {
  res.json(tenants);
});

// GET single tenant
router.get("/:id", (req, res) => {
  const tenant = tenants.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!tenant) {
    return res.status(404).json({
      message: "Tenant not found"
    });
  }

  res.json(tenant);
});

// CREATE tenant
router.post("/", (req, res) => {
  const {
    code,
    name,
    adminName,
    adminEmail,
    plan,
    users
  } = req.body;

  if (!code || !name || !adminName || !adminEmail || !plan) {
    return res.status(400).json({
      message: "Required fields are missing"
    });
  }

  const existingTenant = tenants.find(
    (item) => item.code.toLowerCase() === code.toLowerCase()
  );

  if (existingTenant) {
    return res.status(400).json({
      message: "Tenant code already exists"
    });
  }

  const newTenant = {
    id: tenants.length + 1,
    code,
    name,
    adminName,
    adminEmail,
    plan,
    users: users || 0,
    status: "Active",
    createdAt: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })
  };

  tenants.push(newTenant);

  res.status(201).json(newTenant);
});

// UPDATE tenant
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const tenant = tenants.find(
    (item) => item.id === id
  );

  if (!tenant) {
    return res.status(404).json({
      message: "Tenant not found"
    });
  }

  const {
    code,
    name,
    adminName,
    adminEmail,
    plan,
    users
  } = req.body;

  if (code) tenant.code = code;
  if (name) tenant.name = name;
  if (adminName) tenant.adminName = adminName;
  if (adminEmail) tenant.adminEmail = adminEmail;
  if (plan) tenant.plan = plan;
  if (users !== undefined) tenant.users = users;

  res.json(tenant);
});

// ACTIVATE tenant
router.patch("/:id/activate", (req, res) => {
  const tenant = tenants.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!tenant) {
    return res.status(404).json({
      message: "Tenant not found"
    });
  }

  tenant.status = "Active";

  res.json({
    message: "Tenant activated successfully",
    tenant
  });
});

// DEACTIVATE tenant
router.patch("/:id/deactivate", (req, res) => {
  const tenant = tenants.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!tenant) {
    return res.status(404).json({
      message: "Tenant not found"
    });
  }

  tenant.status = "Inactive";

  res.json({
    message: "Tenant deactivated successfully",
    tenant
  });
});

module.exports = router;
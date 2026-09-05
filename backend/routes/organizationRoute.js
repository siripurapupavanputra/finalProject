const express = require("express");
const router = express.Router();
const organizations = require("../data/organizations");
const tenants = require("../data/tenants");

router.get("/", (req, res) => res.json(organizations));

router.get("/:id", (req, res) => {
  const organization = organizations.find(item => item.id === Number(req.params.id));
  if (!organization) return res.status(404).json({ message: "Organization not found" });
  res.json(organization);
});

router.post("/", (req, res) => {
  const { name, tenantId } = req.body;
  if (!name || !tenantId) return res.status(400).json({ message: "Name and tenantId are required" });
  const tenant = tenants.find(item => item.id === Number(tenantId));
  if (!tenant) return res.status(404).json({ message: "Tenant not found" });
  if (organizations.some(item => item.name.toLowerCase() === name.trim().toLowerCase())) {
    return res.status(400).json({ message: "Organization already exists" });
  }
  const newOrganization = {
    id: organizations.length ? Math.max(...organizations.map(item => item.id)) + 1 : 1,
    name: name.trim(), tenantId: tenant.id, tenant: tenant.name, users: 0, status: "Active",
    createdAt: new Date().toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" })
  };
  organizations.push(newOrganization);
  res.status(201).json(newOrganization);
});

router.put("/:id", (req, res) => {
  const organization = organizations.find(item => item.id === Number(req.params.id));
  if (!organization) return res.status(404).json({ message: "Organization not found" });
  const { name, tenantId } = req.body;
  if (name) organization.name = name.trim();
  if (tenantId) {
    const tenant = tenants.find(item => item.id === Number(tenantId));
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });
    organization.tenantId = tenant.id;
    organization.tenant = tenant.name;
  }
  res.json(organization);
});

router.patch("/:id/activate", (req, res) => {
  const organization = organizations.find(item => item.id === Number(req.params.id));
  if (!organization) return res.status(404).json({ message: "Organization not found" });
  organization.status = "Active";
  res.json({ message: "Organization activated successfully", organization });
});

router.patch("/:id/deactivate", (req, res) => {
  const organization = organizations.find(item => item.id === Number(req.params.id));
  if (!organization) return res.status(404).json({ message: "Organization not found" });
  organization.status = "Inactive";
  res.json({ message: "Organization deactivated successfully", organization });
});

module.exports = router;

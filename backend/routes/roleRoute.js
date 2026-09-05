const express = require("express");
const router = express.Router();
const roles = require("../data/roles");

router.get("/", (req, res) => res.json(roles));

router.get("/:id", (req, res) => {
  const role = roles.find(item => item.id === Number(req.params.id));
  if (!role) return res.status(404).json({ message: "Role not found" });
  res.json(role);
});

router.post("/", (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) return res.status(400).json({ message: "Name and description are required" });
  if (roles.some(item => item.name.toLowerCase() === name.trim().toLowerCase())) {
    return res.status(400).json({ message: "Role already exists" });
  }
  const newRole = {
    id: roles.length ? Math.max(...roles.map(item => item.id)) + 1 : 1,
    name: name.trim(), description: description.trim(), users: 0, status: "Active",
    createdAt: new Date().toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" })
  };
  roles.push(newRole);
  res.status(201).json(newRole);
});

router.put("/:id", (req, res) => {
  const role = roles.find(item => item.id === Number(req.params.id));
  if (!role) return res.status(404).json({ message: "Role not found" });
  const { name, description } = req.body;
  if (name) role.name = name.trim();
  if (description) role.description = description.trim();
  res.json(role);
});

router.patch("/:id/activate", (req, res) => {
  const role = roles.find(item => item.id === Number(req.params.id));
  if (!role) return res.status(404).json({ message: "Role not found" });
  role.status = "Active";
  res.json({ message: "Role activated successfully", role });
});

router.patch("/:id/deactivate", (req, res) => {
  const role = roles.find(item => item.id === Number(req.params.id));
  if (!role) return res.status(404).json({ message: "Role not found" });
  role.status = "Inactive";
  res.json({ message: "Role deactivated successfully", role });
});

module.exports = router;

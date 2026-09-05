const express = require("express");
const router = express.Router();
const users = require("../data/users");
const organizations = require("../data/organizations");
const roles = require("../data/roles");

router.get("/", (req, res) => res.json(users));

router.get("/:id", (req, res) => {
  const user = users.find(item => item.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

router.post("/", (req, res) => {
  const { name, email, organizationId, roleId } = req.body;
  if (!name || !email || !organizationId || !roleId) {
    return res.status(400).json({ message: "Name, email, organizationId and roleId are required" });
  }
  if (users.some(item => item.email.toLowerCase() === email.trim().toLowerCase())) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const organization = organizations.find(item => item.id === Number(organizationId));
  const role = roles.find(item => item.id === Number(roleId));
  if (!organization) return res.status(404).json({ message: "Organization not found" });
  if (!role) return res.status(404).json({ message: "Role not found" });

  const newUser = {
    id: users.length ? Math.max(...users.map(item => item.id)) + 1 : 1,
    name: name.trim(), email: email.trim(), organizationId: organization.id,
    organization: organization.name, roleId: role.id, role: role.name, status: "Active",
    createdAt: new Date().toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" })
  };
  users.push(newUser);
  organization.users += 1;
  role.users += 1;
  res.status(201).json(newUser);
});

router.put("/:id", (req, res) => {
  const user = users.find(item => item.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  const { name, email, organizationId, roleId } = req.body;
  if (name) user.name = name.trim();
  if (email) user.email = email.trim();
  if (organizationId) {
    const organization = organizations.find(item => item.id === Number(organizationId));
    if (!organization) return res.status(404).json({ message: "Organization not found" });
    user.organizationId = organization.id; user.organization = organization.name;
  }
  if (roleId) {
    const role = roles.find(item => item.id === Number(roleId));
    if (!role) return res.status(404).json({ message: "Role not found" });
    user.roleId = role.id; user.role = role.name;
  }
  res.json(user);
});

router.patch("/:id/activate", (req, res) => {
  const user = users.find(item => item.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  user.status = "Active";
  res.json({ message: "User activated successfully", user });
});

router.patch("/:id/deactivate", (req, res) => {
  const user = users.find(item => item.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  user.status = "Inactive";
  res.json({ message: "User deactivated successfully", user });
});

module.exports = router;

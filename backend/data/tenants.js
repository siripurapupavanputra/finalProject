let tenants = [
  {
    id: 1,
    code: "ACM001",
    name: "Acme Corp",
    adminName: "John Smith",
    adminEmail: "john@acme.com",
    plan: "Enterprise",
    users: 250,
    status: "Active",
    createdAt: "01 Aug 2026"
  },
  {
    id: 2,
    code: "TEC002",
    name: "TechNova",
    adminName: "David",
    adminEmail: "david@technova.com",
    plan: "Pro",
    users: 120,
    status: "Active",
    createdAt: "05 Aug 2026"
  },
  {
    id: 3,
    code: "ALP003",
    name: "Alpha Ltd",
    adminName: "Sarah",
    adminEmail: "sarah@alpha.com",
    plan: "Basic",
    users: 45,
    status: "Inactive",
    createdAt: "10 Aug 2026"
  }
];

module.exports = tenants;
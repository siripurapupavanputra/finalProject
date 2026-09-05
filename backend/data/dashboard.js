const dashboardStats = {
  totalTenants: 125,
  activeTenants: 112,
  inactiveTenants: 13,
  totalUsers: 5240,
  activeLicenses: 98
};

const platformHealth = {
  apiGateway: "Healthy",
  database: "Connected",
  server: "Running",
  storage: 68,
  cpu: 42,
  memory: 61
};

const analytics = {
  tenantGrowth: [
    {
      month: "Jan",
      tenants: 80
    },
    {
      month: "Feb",
      tenants: 88
    },
    {
      month: "Mar",
      tenants: 95
    },
    {
      month: "Apr",
      tenants: 102
    },
    {
      month: "May",
      tenants: 110
    },
    {
      month: "Jun",
      tenants: 118
    },
    {
      month: "Jul",
      tenants: 125
    }
  ]
};

const activities = [
  {
    id: 1,
    message: "New tenant created",
    time: "10 minutes ago"
  },
  {
    id: 2,
    message: "Tenant activated",
    time: "30 minutes ago"
  },
  {
    id: 3,
    message: "Tenant configuration updated",
    time: "1 hour ago"
  },
  {
    id: 4,
    message: "License renewed",
    time: "2 hours ago"
  },
  {
    id: 5,
    message: "Tenant deactivated",
    time: "3 hours ago"
  }
];

module.exports = {
  dashboardStats,
  platformHealth,
  analytics,
  activities
};
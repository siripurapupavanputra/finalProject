import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function AdminLayout() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "📊",
    },
    {
      name: "Tenants",
      path: "/tenants",
      icon: "🏢",
    },
    {
      name: "Organizations",
      path: "/organizations",
      icon: "🏬",
    },
    {
      name: "Users",
      path: "/users",
      icon: "👥",
    },
    {
      name: "Role Management",
      path: "/roles",
      icon: "🛡️",
    },
    {
      name: "Permission Management",
      path: "/permissions",
      icon: "🔐",
    },
    {
      name: "Data Permissions",
      path: "/data-permissions",
      icon: "🗂️",
    },
    {
      name: "Feature Management",
      path: "/features",
      icon: "⚙️",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-gray-900 text-white">
        <div className="flex h-16 items-center border-b border-gray-700 px-6">
          <h1 className="text-xl font-bold">Super Admin</h1>
        </div>

        <nav className="h-[calc(100vh-4rem)] overflow-y-auto p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Menu
          </p>

          <div className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </aside>

      <div className="ml-64 flex min-h-screen w-full flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">
            Admin Panel
          </h2>

          <div className="text-sm text-gray-500">Admin</div>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;

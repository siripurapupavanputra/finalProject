import React, { useState } from "react";

const permissionGroups = [
  { name: "Dashboard", permissions: ["View Dashboard", "View Analytics"] },
  { name: "Tenant Management", permissions: ["View Tenants", "Create Tenants", "Edit Tenants", "Activate / Deactivate Tenants"] },
  { name: "Organization Management", permissions: ["View Organizations", "Create Organizations", "Edit Organizations", "Manage Organization Status"] },
  { name: "User Management", permissions: ["View Users", "Create Users", "Edit Users", "Activate / Deactivate Users"] },
  { name: "Feature Management", permissions: ["View Features", "Create Features", "Edit Features", "Enable / Disable Features"] },
];

function Permissions() {
  const [selectedRole, setSelectedRole] = useState("Super Admin");
  const [enabled, setEnabled] = useState(() => new Set(permissionGroups.flatMap((group) => group.permissions)));

  const toggle = (permission) => {
    setEnabled((current) => {
      const next = new Set(current);
      next.has(permission) ? next.delete(permission) : next.add(permission);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="mb-6"><h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Permission Management</h1><p className="mt-1 text-gray-500">Control which actions each role can perform.</p></div>
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><label className="font-medium text-gray-700">Select Role</label><select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"><option>Super Admin</option><option>Admin</option><option>Manager</option><option>User</option></select></div>
        <div className="space-y-5">{permissionGroups.map((group) => <div key={group.name} className="rounded-lg border p-4"><h2 className="mb-3 font-semibold text-gray-800">{group.name}</h2><div className="grid gap-3 sm:grid-cols-2">{group.permissions.map((permission) => <label key={permission} className="flex cursor-pointer items-center gap-3 rounded-lg bg-gray-50 p-3"><input type="checkbox" checked={enabled.has(permission)} onChange={() => toggle(permission)} className="h-4 w-4" /><span className="text-sm text-gray-700">{permission}</span></label>)}</div></div>)}</div>
        <button className="mt-6 rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700">Save Permissions</button>
      </div>
    </div>
  );
}
export default Permissions;

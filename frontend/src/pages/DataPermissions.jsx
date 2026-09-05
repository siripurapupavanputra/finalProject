import React, { useMemo, useState } from "react";

const resources = [
  {
    name: "Tenants",
    description: "Control which tenant records a role can access.",
    options: ["View", "Create", "Edit", "Delete", "Activate / Deactivate"],
  },
  {
    name: "Organizations",
    description: "Control organization-level data access.",
    options: ["View", "Create", "Edit", "Delete"],
  },
  {
    name: "Users",
    description: "Control access to user records and user actions.",
    options: ["View", "Create", "Edit", "Delete", "Activate / Deactivate"],
  },
  {
    name: "Roles",
    description: "Control access to role configuration data.",
    options: ["View", "Create", "Edit", "Delete"],
  },
  {
    name: "Reports",
    description: "Control access to platform reports and analytics.",
    options: ["View", "Export"],
  },
];

const roleDefaults = {
  "Super Admin": "all",
  Admin: "limited",
  Manager: "manager",
  User: "user",
};

function createInitialPermissions(role) {
  const mode = roleDefaults[role] || "user";
  const result = {};

  resources.forEach((resource) => {
    resource.options.forEach((option) => {
      const key = `${resource.name}:${option}`;

      if (mode === "all") {
        result[key] = true;
      } else if (mode === "limited") {
        result[key] = ["View", "Create", "Edit"].includes(option);
      } else if (mode === "manager") {
        result[key] =
          resource.name === "Reports"
            ? option === "View"
            : option === "View";
      } else {
        result[key] = resource.name === "Reports" && option === "View";
      }
    });
  });

  return result;
}

function DataPermissions() {
  const [selectedRole, setSelectedRole] = useState("Super Admin");
  const [permissions, setPermissions] = useState(() =>
    createInitialPermissions("Super Admin")
  );
  const [saved, setSaved] = useState(false);

  const enabledCount = useMemo(
    () => Object.values(permissions).filter(Boolean).length,
    [permissions]
  );

  const togglePermission = (resource, option) => {
    const key = `${resource}:${option}`;

    setSaved(false);
    setPermissions((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const changeRole = (role) => {
    setSelectedRole(role);
    setPermissions(createInitialPermissions(role));
    setSaved(false);
  };

  const toggleResource = (resource) => {
    const options = resource.options;
    const allEnabled = options.every(
      (option) => permissions[`${resource.name}:${option}`]
    );

    setSaved(false);
    setPermissions((current) => {
      const next = { ...current };

      options.forEach((option) => {
        next[`${resource.name}:${option}`] = !allEnabled;
      });

      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          Data Permissions
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Define what data each role can view and manage across the platform.
        </p>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Select Role
            </label>

            <select
              value={selectedRole}
              onChange={(e) => changeRole(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:w-64"
            >
              <option>Super Admin</option>
              <option>Admin</option>
              <option>Manager</option>
              <option>User</option>
            </select>
          </div>

          <div className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700">
            <span className="font-semibold">{enabledCount}</span> permissions
            enabled for <span className="font-semibold">{selectedRole}</span>
          </div>
        </div>

        <div className="space-y-4">
          {resources.map((resource) => {
            const allEnabled = resource.options.every(
              (option) => permissions[`${resource.name}:${option}`]
            );

            return (
              <div
                key={resource.name}
                className="overflow-hidden rounded-xl border border-gray-200"
              >
                <div className="flex flex-col gap-3 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-semibold text-gray-800">
                      {resource.name}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {resource.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleResource(resource)}
                    className="rounded-lg border bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    {allEnabled ? "Clear All" : "Select All"}
                  </button>
                </div>

                <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
                  {resource.options.map((option) => {
                    const key = `${resource.name}:${option}`;

                    return (
                      <label
                        key={key}
                        className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={Boolean(permissions[key])}
                          onChange={() =>
                            togglePermission(resource.name, option)
                          }
                          className="h-4 w-4"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            Changes are kept in this page until you save them.
          </p>

          <button
            type="button"
            onClick={() => setSaved(true)}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
          >
            Save Data Permissions
          </button>
        </div>

        {saved && (
          <div className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            Data permissions saved successfully for {selectedRole}.
          </div>
        )}
      </div>
    </div>
  );
}

export default DataPermissions;

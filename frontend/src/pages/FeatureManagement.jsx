import React, { useMemo, useState } from "react";

const initialFeatures = [
  {
    id: 1,
    name: "Dashboard Analytics",
    description: "View platform analytics, KPIs and performance charts.",
    category: "Analytics",
    plans: ["Enterprise", "Professional"],
    status: "Enabled",
  },
  {
    id: 2,
    name: "Tenant Management",
    description: "Create, edit, activate and deactivate tenants.",
    category: "Core",
    plans: ["Enterprise", "Professional", "Basic"],
    status: "Enabled",
  },
  {
    id: 3,
    name: "Role Management",
    description: "Create roles and control role-based access.",
    category: "Security",
    plans: ["Enterprise", "Professional"],
    status: "Enabled",
  },
  {
    id: 4,
    name: "Permission Management",
    description: "Configure permissions for application actions.",
    category: "Security",
    plans: ["Enterprise", "Professional"],
    status: "Enabled",
  },
  {
    id: 5,
    name: "Data Permissions",
    description: "Control access to organization and tenant data.",
    category: "Security",
    plans: ["Enterprise"],
    status: "Disabled",
  },
  {
    id: 6,
    name: "Advanced Reports",
    description: "Generate advanced reports and export platform data.",
    category: "Reporting",
    plans: ["Enterprise"],
    status: "Disabled",
  },
];

function FeatureManagement() {
  const [features, setFeatures] = useState(initialFeatures);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [plan, setPlan] = useState("All");

  const categories = ["All", ...new Set(initialFeatures.map((feature) => feature.category))];

  const filteredFeatures = useMemo(() => {
    return features.filter((feature) => {
      const matchesSearch =
        `${feature.name} ${feature.description} ${feature.category}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || feature.category === category;

      const matchesPlan =
        plan === "All" || feature.plans.includes(plan);

      return matchesSearch && matchesCategory && matchesPlan;
    });
  }, [features, search, category, plan]);

  const toggleFeature = (id) => {
    setFeatures((current) =>
      current.map((feature) =>
        feature.id === id
          ? {
              ...feature,
              status: feature.status === "Enabled" ? "Disabled" : "Enabled",
            }
          : feature
      )
    );
  };

  const enabledCount = features.filter(
    (feature) => feature.status === "Enabled"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          Feature Management
        </h1>
        <p className="mt-1 text-gray-500">
          Enable or disable platform features and control which plans can use them.
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Features</p>
          <p className="mt-2 text-3xl font-bold text-gray-800">
            {features.length}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Enabled Features</p>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {enabledCount}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Disabled Features</p>
          <p className="mt-2 text-3xl font-bold text-red-600">
            {features.length - enabledCount}
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="mb-5 grid gap-3 md:grid-cols-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search features..."
            className="rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>

          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Plans</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Professional">Professional</option>
            <option value="Basic">Basic</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="p-3">Feature</th>
                <th className="p-3">Category</th>
                <th className="p-3">Available Plans</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredFeatures.map((feature) => (
                <tr key={feature.id} className="border-b last:border-0">
                  <td className="p-3">
                    <div className="font-medium text-gray-800">
                      {feature.name}
                    </div>
                    <div className="mt-1 max-w-md text-xs text-gray-500">
                      {feature.description}
                    </div>
                  </td>

                  <td className="p-3">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      {feature.category}
                    </span>
                  </td>

                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {feature.plans.map((item) => (
                        <span
                          key={item}
                          className="rounded bg-blue-50 px-2 py-1 text-xs text-blue-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="p-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        feature.status === "Enabled"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {feature.status}
                    </span>
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => toggleFeature(feature.id)}
                      className={`rounded-lg px-3 py-2 text-xs font-medium ${
                        feature.status === "Enabled"
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-green-50 text-green-600 hover:bg-green-100"
                      }`}
                    >
                      {feature.status === "Enabled" ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredFeatures.length === 0 && (
            <div className="py-10 text-center text-gray-500">
              No features found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeatureManagement;

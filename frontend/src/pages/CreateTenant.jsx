import React, { useState } from "react";
import { useCreateTenant } from "../hooks/useCreateTenant";

function CreateTenant() {
  const createTenantMutation = useCreateTenant();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    adminName: "",
    adminEmail: "",
    phone: "",
    plan: "Enterprise",
    country: "India",
    timeZone: "Asia/Kolkata",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Tenant name is required");
      return;
    }

    if (!formData.code.trim()) {
      alert("Tenant code is required");
      return;
    }

    if (!formData.adminName.trim()) {
      alert("Admin name is required");
      return;
    }

    if (!formData.adminEmail.trim()) {
      alert("Admin email is required");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.adminEmail)) {
      alert("Please enter a valid email");
      return;
    }

    if (!formData.plan) {
      alert("Subscription is required");
      return;
    }

    // Send data to backend
    createTenantMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-5 shadow-sm sm:p-8">

        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Create New Tenant
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Tenant Name */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Tenant Name
            </label>

            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Tenant Code */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Tenant Code
            </label>

            <input
              name="code"
              type="text"
              value={formData.code}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Admin Name */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Admin Name
            </label>

            <input
              name="adminName"
              type="text"
              value={formData.adminName}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Admin Email */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Admin Email
            </label>

            <input
              name="adminEmail"
              type="email"
              value={formData.adminEmail}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Subscription + Country */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            <div>
              <label className="mb-1 block text-sm font-medium">
                Subscription
              </label>

              <select
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2"
              >
                <option value="Enterprise">Enterprise</option>
                <option value="Pro">Pro</option>
                <option value="Basic">Basic</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Country
              </label>

              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2"
              >
                <option value="India">India</option>
                <option value="USA">USA</option>
              </select>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              className="rounded-lg border px-5 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createTenantMutation.isPending}
              className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {createTenantMutation.isPending
                ? "Creating..."
                : "Create Tenant"}
            </button>

          </div>

          {/* Error */}
          {createTenantMutation.isError && (
            <p className="text-sm text-red-600">
              {createTenantMutation.error.message}
            </p>
          )}

          {/* Success */}
          {createTenantMutation.isSuccess && (
            <p className="text-sm text-green-600">
              Tenant created successfully!
            </p>
          )}

        </form>
      </div>
    </div>
  );
}

export default CreateTenant;
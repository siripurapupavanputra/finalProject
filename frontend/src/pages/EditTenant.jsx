import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useTenant } from "../hooks/useTenant";
import { useUpdateTenant } from "../hooks/useUpdateTenant";

function EditTenant() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: tenant,
    isLoading,
    isError
  } = useTenant(id);

  const updateTenant = useUpdateTenant();

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (tenant) {
      setFormData(tenant);
    }
  }, [tenant]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-gray-600">
          Loading...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-red-600">
          Failed to load tenant
        </p>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-gray-600">
          Loading form...
        </p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    updateTenant.mutate({
      id,
      tenant: formData
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Edit Tenant
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Update the tenant information below.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* Tenant Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Tenant Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter tenant name"
              />
            </div>

            {/* Tenant Code */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Tenant Code
              </label>

              <input
                type="text"
                name="code"
                value={formData.code || ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 uppercase outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter tenant code"
              />
            </div>

            {/* Admin Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Admin Name
              </label>

              <input
                type="text"
                name="adminName"
                value={formData.adminName || ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter admin name"
              />
            </div>

            {/* Admin Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Admin Email
              </label>

              <input
                type="email"
                name="adminEmail"
                value={formData.adminEmail || ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter admin email"
              />
            </div>

            {/* Plan */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Subscription Plan
              </label>

              <select
                name="plan"
                value={formData.plan || ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Basic">Basic</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">
                  Enterprise
                </option>
              </select>
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">

            <button
              onClick={() => navigate(`/tenants/${id}`)}
              className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={updateTenant.isPending}
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updateTenant.isPending ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default EditTenant;
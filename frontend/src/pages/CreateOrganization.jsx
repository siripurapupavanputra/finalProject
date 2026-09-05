import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTenants } from "../hooks/useTenants";
import { useCreateOrganization } from "../hooks/useOrganizationMutations";

function CreateOrganization() {
  const navigate = useNavigate();
  const createOrganizationMutation = useCreateOrganization();

  const {
    data: tenants = [],
    isLoading: tenantsLoading
  } = useTenants();

  const [formData, setFormData] = useState({
    name: "",
    tenantId: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Organization name is required");
      return;
    }

    if (!formData.tenantId) {
      alert("Please select a tenant");
      return;
    }

    createOrganizationMutation.mutate(
      {
        name: formData.name.trim(),
        tenantId: Number(formData.tenantId)
      },
      {
        onSuccess: () => {
          navigate("/organizations");
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-5 shadow-sm sm:p-8">

        <button
          type="button"
          onClick={() => navigate("/organizations")}
          className="mb-5 text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Organizations
        </button>

        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          Create New Organization
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          Create an organization and assign it to a tenant.
        </p>

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >

          {/* Organization Name */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Organization Name
            </label>

            <input
              required
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter organization name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Tenant */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Tenant
            </label>

            <select
              required
              name="tenantId"
              value={formData.tenantId}
              onChange={handleChange}
              disabled={tenantsLoading}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 disabled:bg-gray-100"
            >
              <option value="">
                {tenantsLoading
                  ? "Loading..."
                  : "Select Tenant"}
              </option>

              {tenants
                .filter(
                  (tenant) =>
                    tenant.status === "Active"
                )
                .map((tenant) => (
                  <option
                    key={tenant.id}
                    value={tenant.id}
                  >
                    {tenant.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Error */}
          {createOrganizationMutation.isError && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {createOrganizationMutation.error?.message ||
                "Failed to create organization"}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() => navigate("/organizations")}
              className="rounded-lg border border-gray-300 px-5 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                createOrganizationMutation.isPending ||
                tenantsLoading
              }
              className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {createOrganizationMutation.isPending
                ? "Creating..."
                : "Create Organization"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateOrganization;

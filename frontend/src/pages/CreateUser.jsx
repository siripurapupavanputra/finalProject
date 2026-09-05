
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrganizations } from "../hooks/useOrganizations";
import { useRoles } from "../hooks/useRoles";
import { useCreateUser } from "../hooks/useUserMutations";

function CreateUser() {
  const navigate = useNavigate();
  const createUserMutation = useCreateUser();

  const {
    data: organizations = [],
    isLoading: organizationsLoading,
  } = useOrganizations();

  const {
    data: roles = [],
    isLoading: rolesLoading,
  } = useRoles();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organizationId: "",
    roleId: "",
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

    createUserMutation.mutate(
      {
        name: formData.name.trim(),
        email: formData.email.trim(),
        organizationId: Number(formData.organizationId),
        roleId: Number(formData.roleId),
      },
      {
        onSuccess: () => {
          navigate("/users");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-5 shadow-sm sm:p-8">

        <button
          type="button"
          onClick={() => navigate("/users")}
          className="mb-5 text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Users
        </button>

        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          Create New User
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          Add a user and assign an organization and role.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Full Name */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Full Name
            </label>

            <input
              required
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              placeholder="Enter full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Email Address
            </label>

            <input
              required
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              placeholder="Enter email address"
            />
          </div>

          {/* Organization + Role */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            {/* Organization */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Organization
              </label>

              <select
                required
                name="organizationId"
                value={formData.organizationId}
                onChange={handleChange}
                disabled={organizationsLoading}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 disabled:bg-gray-100"
              >
                <option value="">
                  {organizationsLoading
                    ? "Loading..."
                    : "Select Organization"}
                </option>

                {organizations
                  .filter(
                    (organization) =>
                      organization.status === "Active"
                  )
                  .map((organization) => (
                    <option
                      key={organization.id}
                      value={organization.id}
                    >
                      {organization.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Role */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Role
              </label>

              <select
                required
                name="roleId"
                value={formData.roleId}
                onChange={handleChange}
                disabled={rolesLoading}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 disabled:bg-gray-100"
              >
                <option value="">
                  {rolesLoading ? "Loading..." : "Select Role"}
                </option>

                {roles
                  .filter(
                    (role) => role.status === "Active"
                  )
                  .map((role) => (
                    <option
                      key={role.id}
                      value={role.id}
                    >
                      {role.name}
                    </option>
                  ))}
              </select>
            </div>

          </div>

          {/* Error */}
          {createUserMutation.isError && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {createUserMutation.error.message}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() => navigate("/users")}
              className="rounded-lg border px-5 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createUserMutation.isPending}
              className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {createUserMutation.isPending
                ? "Creating..."
                : "Create User"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateUser;

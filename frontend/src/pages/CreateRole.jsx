import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateRole } from "../hooks/useRoleMutations";

function CreateRole() {
  const navigate = useNavigate();
  const createRoleMutation = useCreateRole();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
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

    createRoleMutation.mutate(
      {
        name: formData.name.trim(),
        description: formData.description.trim(),
      },
      {
        onSuccess: () => {
          navigate("/roles");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-5 shadow-sm sm:p-8">

        <button
          type="button"
          onClick={() => navigate("/roles")}
          className="mb-5 text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Roles
        </button>

        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          Create New Role
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          Create a role and define its access-level description.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Role Name
            </label>

            <input
              required
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter role name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Description
            </label>

            <textarea
              required
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe this role's access level"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {createRoleMutation.isError && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {createRoleMutation.error.message}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() => navigate("/roles")}
              className="rounded-lg border px-5 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createRoleMutation.isPending}
              className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {createRoleMutation.isPending
                ? "Creating..."
                : "Create Role"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateRole;



import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useRole } from "../hooks/useRole";
import {
  useActivateRole,
  useDeactivateRole,
} from "../hooks/useRoleMutations";

function RoleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get role details
  const {
    data: role,
    isLoading,
    isError,
    error,
  } = useRole(id);

  // Mutation hooks
  const activateRole = useActivateRole();
  const deactivateRole = useDeactivateRole();

  // Loading
  if (isLoading) {
    return <p>Loading role...</p>;
  }

  // Error
  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  // Edit Role
  const handleEdit = () => {
    navigate(`/roles/${id}/edit`);
  };

  // Activate Role
  const handleActivate = () => {
    activateRole.mutate(Number(id));
  };

  // Deactivate Role
  const handleDeactivate = () => {
    deactivateRole.mutate(Number(id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">

      <div className="mx-auto max-w-4xl">

        <div className="rounded-lg bg-white p-5 shadow-sm sm:p-8">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Role Details
              </h1>

              <h2 className="mt-2 text-xl font-semibold">
                {role.name}
              </h2>
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${
                role.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {role.status}
            </span>

          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div>
              <p className="text-sm text-gray-500">
                Role
              </p>

              <p className="font-medium">
                {role.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Users
              </p>

              <p className="font-medium">
                {role.users}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-sm text-gray-500">
                Description
              </p>

              <p className="font-medium">
                {role.description}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Status
              </p>

              <p className="font-medium">
                {role.status}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Created
              </p>

              <p className="font-medium">
                {role.createdAt}
              </p>
            </div>

          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              onClick={handleEdit}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              Edit Role
            </button>

            {role.status === "Active" ? (
              <button
                type="button"
                onClick={handleDeactivate}
                disabled={deactivateRole.isPending}
                className="rounded-lg bg-red-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deactivateRole.isPending
                  ? "Deactivating..."
                  : "Deactivate Role"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleActivate}
                disabled={activateRole.isPending}
                className="rounded-lg bg-green-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {activateRole.isPending
                  ? "Activating..."
                  : "Activate Role"}
              </button>
            )}

          </div>

          {(activateRole.isError || deactivateRole.isError) && (
            <p className="mt-4 text-sm text-red-600">
              {(activateRole.error || deactivateRole.error).message}
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default RoleDetails;

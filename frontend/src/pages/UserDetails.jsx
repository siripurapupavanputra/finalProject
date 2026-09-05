import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useUser } from "../hooks/useUser";
import { useActivateUser } from "../hooks/useUserMutations";
import { useDeactivateUser } from "../hooks/useUserMutations";

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get user details
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useUser(id);

  // Mutation hooks
  const activateUser = useActivateUser();
  const deactivateUser = useDeactivateUser();

  // Loading
  if (isLoading) {
    return <p>Loading user...</p>;
  }

  // Error
  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  // Edit User
  const handleEdit = () => {
    navigate(`/users/${id}/edit`);
  };

  // Activate User
  const handleActivate = () => {
    activateUser.mutate(Number(id));
  };

  // Deactivate User
  const handleDeactivate = () => {
    deactivateUser.mutate(Number(id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">

      <div className="mx-auto max-w-4xl">

        <div className="rounded-lg bg-white p-5 shadow-sm sm:p-8">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                User Details
              </h1>

              <h2 className="mt-2 text-xl font-semibold">
                {user.name}
              </h2>
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${
                user.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.status}
            </span>

          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div>
              <p className="text-sm text-gray-500">
                Name
              </p>

              <p className="font-medium">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="font-medium">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Organization
              </p>

              <p className="font-medium">
                {user.organization}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Role
              </p>

              <p className="font-medium">
                {user.role}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Status
              </p>

              <p className="font-medium">
                {user.status}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Created
              </p>

              <p className="font-medium">
                {user.createdAt}
              </p>
            </div>

          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              onClick={handleEdit}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              Edit User
            </button>

            {user.status === "Active" ? (
              <button
                type="button"
                onClick={handleDeactivate}
                disabled={deactivateUser.isPending}
                className="rounded-lg bg-red-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deactivateUser.isPending
                  ? "Deactivating..."
                  : "Deactivate User"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleActivate}
                disabled={activateUser.isPending}
                className="rounded-lg bg-green-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {activateUser.isPending
                  ? "Activating..."
                  : "Activate User"}
              </button>
            )}

          </div>

          {(activateUser.isError || deactivateUser.isError) && (
            <p className="mt-4 text-sm text-red-600">
              {(activateUser.error || deactivateUser.error).message}
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default UserDetails;

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrganization } from "../hooks/useOrganization";
import {
  useActivateOrganization,
  useDeactivateOrganization,
} from "../hooks/useOrganizationMutations";

function OrganizationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get organization details
  const {
    data: organization,
    isLoading,
    isError,
    error,
  } = useOrganization(id);

  // Mutation hooks
  const activateOrganization = useActivateOrganization();
  const deactivateOrganization = useDeactivateOrganization();

  // Loading
  if (isLoading) {
    return <p>Loading organization...</p>;
  }

  // Error
  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  // Edit Organization
  const handleEdit = () => {
    navigate(`/organizations/${id}/edit`);
  };

  // Activate Organization
  const handleActivate = () => {
    activateOrganization.mutate(Number(id));
  };

  // Deactivate Organization
  const handleDeactivate = () => {
    deactivateOrganization.mutate(Number(id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">

      <div className="mx-auto max-w-4xl">

        <div className="rounded-lg bg-white p-5 shadow-sm sm:p-8">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Organization Details
              </h1>

              <h2 className="mt-2 text-xl font-semibold">
                {organization.name}
              </h2>
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${
                organization.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {organization.status}
            </span>

          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div>
              <p className="text-sm text-gray-500">
                Organization
              </p>

              <p className="font-medium">
                {organization.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Tenant
              </p>

              <p className="font-medium">
                {organization.tenant}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Users
              </p>

              <p className="font-medium">
                {organization.users}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Status
              </p>

              <p className="font-medium">
                {organization.status}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Created
              </p>

              <p className="font-medium">
                {organization.createdAt}
              </p>
            </div>

          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              onClick={handleEdit}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              Edit Organization
            </button>

            {organization.status === "Active" ? (
              <button
                type="button"
                onClick={handleDeactivate}
                disabled={deactivateOrganization.isPending}
                className="rounded-lg bg-red-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deactivateOrganization.isPending
                  ? "Deactivating..."
                  : "Deactivate Organization"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleActivate}
                disabled={activateOrganization.isPending}
                className="rounded-lg bg-green-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {activateOrganization.isPending
                  ? "Activating..."
                  : "Activate Organization"}
              </button>
            )}

          </div>

          {(activateOrganization.isError ||
            deactivateOrganization.isError) && (
            <p className="mt-4 text-sm text-red-600">
              {(
                activateOrganization.error ||
                deactivateOrganization.error
              ).message}
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default OrganizationDetails;


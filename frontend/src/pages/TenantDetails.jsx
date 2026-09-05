import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useTenant } from "../hooks/useTenant";
import { useActivateTenant } from "../hooks/useActivateTenant";
import { useDeactivateTenant } from "../hooks/useDeactivateTenant";

function TenantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get tenant details
  const {
    data: tenant,
    isLoading,
    isError,
    error
  } = useTenant(id);

  // Mutation hooks
  
  const activateTenant = useActivateTenant();
  const deactivateTenant = useDeactivateTenant();

  // Loading
  if (isLoading) {
    return <p>Loading tenant...</p>;
  }

  // Error
  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  // Edit Tenant
  const handleEdit = () => {
    navigate(`/tenants/${id}/edit`);
  };

  // Activate Tenant
  const handleActivate = () => {
    activateTenant.mutate(Number(id));
  };

  // Deactivate Tenant
  const handleDeactivate = () => {
    deactivateTenant.mutate(Number(id));
  };

  return (
  <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">

  <div className="mx-auto max-w-4xl">

    <div className="rounded-lg bg-white p-5 shadow-sm sm:p-8">

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Tenant Details
          </h1>

          <h2 className="mt-2 text-xl font-semibold">
            {tenant.name}
          </h2>
        </div>

        <span
          className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${
            tenant.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {tenant.status}
        </span>

      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

        <div>
          <p className="text-sm text-gray-500">
            Tenant Code
          </p>

          <p className="font-medium">
            {tenant.code}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Admin
          </p>

          <p className="font-medium">
            {tenant.adminName}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Email
          </p>

          <p className="font-medium">
            {tenant.adminEmail}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Plan
          </p>

          <p className="font-medium">
            {tenant.plan}
          </p>
        </div>

      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">

        <button
          type="button"
          onClick={handleEdit}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Edit Tenant
        </button>

        {tenant.status === "Active" ? (
          <button
            type="button"
            onClick={handleDeactivate}
            disabled={deactivateTenant.isPending}
            className="rounded-lg bg-red-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deactivateTenant.isPending
              ? "Deactivating..."
              : "Deactivate Tenant"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleActivate}
            disabled={activateTenant.isPending}
            className="rounded-lg bg-green-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {activateTenant.isPending
              ? "Activating..."
              : "Activate Tenant"}
          </button>
        )}

      </div>

      {(activateTenant.isError || deactivateTenant.isError) && (
        <p className="mt-4 text-sm text-red-600">
          {(activateTenant.error || deactivateTenant.error).message}
        </p>
      )}

    </div>

  </div>

</div>
  );
}

export default TenantDetails;

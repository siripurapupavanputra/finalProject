import React, { useState } from "react";
import { useTenants } from "../hooks/useTenants";
import CreateTenant from "./CreateTenant";
import { useNavigate } from "react-router-dom";

function Tenants() {
  const {
    data: tenants,
    isLoading,
    isError,
    error
  } = useTenants();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [plan, setPlan] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (showForm) {
    return (
      <div>
        <button onClick={() => setShowForm(false)}>
          Back to Tenants
        </button>

        <CreateTenant onCreated={() => setShowForm(false)} />
      </div>
    );
  }

  const tenantsPerPage = 10;

  // SEARCH + FILTER
  const filteredTenants = tenants.filter((tenant) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      tenant.name.toLowerCase().includes(searchText) ||
      tenant.code.toLowerCase().includes(searchText);

    const matchesStatus =
      status === "All" ||
      tenant.status === status;

    const matchesPlan =
      plan === "All" ||
      tenant.plan === plan;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPlan
    );
  });

  // PAGINATION
  const totalPages = Math.ceil(
    filteredTenants.length / tenantsPerPage
  );

  const startIndex =
    (currentPage - 1) * tenantsPerPage;

  const paginatedTenants = filteredTenants.slice(
    startIndex,
    startIndex + tenantsPerPage
  );

  return (
   <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

  {/* HEADER */}
  <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

    <div>
      <h1 className="text-2xl font-bold text-gray-800">
        Tenant Management
      </h1>

      <p className="text-sm text-gray-500">
        Manage all platform tenants
      </p>
    </div>

    <button
      onClick={() => setShowForm(true)}
      className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
    >
      + New Tenant
    </button>

  </div>

  {/* SEARCH + FILTERS */}
  <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

    <input
      type="text"
      placeholder="Search tenant name or code"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
      }}
      className="rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500"
    />

    <select
      value={status}
      onChange={(e) => {
        setStatus(e.target.value);
        setCurrentPage(1);
      }}
      className="rounded-lg border border-gray-300 bg-white px-4 py-2"
    >
      <option value="All">All Status</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>

    <select
      value={plan}
      onChange={(e) => {
        setPlan(e.target.value);
        setCurrentPage(1);
      }}
      className="rounded-lg border border-gray-300 bg-white px-4 py-2"
    >
      <option value="All">All Plans</option>
      <option value="Pro">Pro</option>
      <option value="Basic">Basic</option>
      <option value="Enterprise">Enterprise</option>
    </select>

  </div>

  {/* TABLE */}
  <div className="overflow-x-auto rounded-lg bg-white shadow-sm">

    <table className="min-w-[900px] w-full text-left">

      <thead className="bg-gray-50">

        <tr>
          <th className="px-4 py-3 text-sm font-semibold">
            Code
          </th>

          <th className="px-4 py-3 text-sm font-semibold">
            Name
          </th>

          <th className="px-4 py-3 text-sm font-semibold">
            Admin
          </th>

          <th className="px-4 py-3 text-sm font-semibold">
            Plan
          </th>

          <th className="px-4 py-3 text-sm font-semibold">
            Users
          </th>

          <th className="px-4 py-3 text-sm font-semibold">
            Status
          </th>

          <th className="px-4 py-3 text-sm font-semibold">
            Created
          </th>

          <th className="px-4 py-3 text-sm font-semibold">
            Actions
          </th>
        </tr>

      </thead>

      <tbody>

        {paginatedTenants.map((tenant) => (

          <tr
            key={tenant.id}
            className="border-t hover:bg-gray-50"
          >

            <td className="px-4 py-3">
              {tenant.code}
            </td>

            <td className="px-4 py-3 font-medium">
              {tenant.name}
            </td>

            <td className="px-4 py-3">
              {tenant.adminName}
            </td>

            <td className="px-4 py-3">
              {tenant.plan}
            </td>

            <td className="px-4 py-3">
              {tenant.users}
            </td>

            <td className="px-4 py-3">

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  tenant.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {tenant.status}
              </span>

            </td>

            <td className="px-4 py-3">
              {tenant.createdAt}
            </td>

            <td className="px-4 py-3">

              <div className="flex gap-2">

                <button
                  onClick={() =>
                    navigate(`/tenants/${tenant.id}`)
                  }
                  className="rounded bg-blue-100 px-3 py-1 text-sm text-blue-700"
                >
                  View
                </button>

                <button
                  onClick={() =>
                    navigate(`/tenants/${tenant.id}/edit`)
                  }
                  className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700"
                >
                  Edit
                </button>

              </div>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

  {/* PAGINATION */}
  <div className="mt-4 flex items-center justify-between">

    <button
      disabled={currentPage === 1}
      onClick={() =>
        setCurrentPage(currentPage - 1)
      }
      className="rounded-lg border bg-white px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Previous
    </button>

    <span className="text-sm text-gray-600">
      Page {currentPage} of {totalPages || 1}
    </span>

    <button
      disabled={
        currentPage === totalPages ||
        totalPages === 0
      }
      onClick={() =>
        setCurrentPage(currentPage + 1)
      }
      className="rounded-lg border bg-white px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Next
    </button>

  </div>

</div>
  );
}

export default Tenants;
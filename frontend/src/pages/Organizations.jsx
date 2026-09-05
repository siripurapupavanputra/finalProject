import React, { useState } from "react";
import { useOrganizations } from "../hooks/useOrganizations";
import { useNavigate } from "react-router-dom";
import { useActivateOrganization, useDeactivateOrganization } from "../hooks/useOrganizationMutations";

function Organizations() {
  const { data: organizations = [], isLoading, isError, error } = useOrganizations();
  const navigate = useNavigate();
  const activateMutation = useActivateOrganization();
  const deactivateMutation = useDeactivateOrganization();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) return <div className="p-8">Loading organizations...</div>;
  if (isError) return <div className="p-8 text-red-600">Error: {error.message}</div>;

  const perPage = 10;
  const filteredOrganizations = organizations.filter((organization) => {
    const q = search.toLowerCase();
    return (
      (organization.name.toLowerCase().includes(q) || organization.tenant.toLowerCase().includes(q)) &&
      (status === "All" || organization.status === status)
    );
  });
  const totalPages = Math.ceil(filteredOrganizations.length / perPage);
  const paginatedOrganizations = filteredOrganizations.slice((currentPage - 1) * perPage, currentPage * perPage);
  const togglePending = activateMutation.isPending || deactivateMutation.isPending;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div><h1 className="text-2xl font-bold text-gray-800">Organization Management</h1><p className="text-sm text-gray-500">Manage all platform organizations</p></div>
        <button onClick={() => navigate("/organizations/new")} className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">+ New Organization</button>
      </div>
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input type="text" placeholder="Search organization or tenant" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} className="rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500" />
        <select value={status} onChange={(e) => { setStatus(e.target.value); setCurrentPage(1); }} className="rounded-lg border border-gray-300 bg-white px-4 py-2">
          <option value="All">All Status</option><option value="Active">Active</option><option value="Inactive">Inactive</option>
        </select>
      </div>
      <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
        <table className="min-w-[900px] w-full text-left">
          <thead className="bg-gray-50"><tr>
            <th className="px-4 py-3 text-sm font-semibold">Organization</th><th className="px-4 py-3 text-sm font-semibold">Tenant</th>
            <th className="px-4 py-3 text-sm font-semibold">Users</th><th className="px-4 py-3 text-sm font-semibold">Status</th>
            <th className="px-4 py-3 text-sm font-semibold">Created</th><th className="px-4 py-3 text-sm font-semibold">Actions</th>
          </tr></thead>
          <tbody>{paginatedOrganizations.map((organization) => (
            <tr key={organization.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">{organization.name}</td><td className="px-4 py-3">{organization.tenant}</td><td className="px-4 py-3">{organization.users}</td>
              <td className="px-4 py-3"><span className={`rounded-full px-3 py-1 text-xs font-medium ${organization.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{organization.status}</span></td>
              <td className="px-4 py-3">{organization.createdAt}</td>
              <td className="px-4 py-3"><div className="flex gap-2">
                <button onClick={() => navigate(`/organizations/${organization.id}`)} className="rounded bg-blue-100 px-3 py-1 text-sm text-blue-700">View</button>
                <button disabled={togglePending} onClick={() => organization.status === "Active" ? deactivateMutation.mutate(organization.id) : activateMutation.mutate(organization.id)} className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 disabled:opacity-50">{organization.status === "Active" ? "Deactivate" : "Activate"}</button>
              </div></td>
            </tr>
          ))}</tbody>
        </table>
        {filteredOrganizations.length === 0 && <div className="py-10 text-center text-gray-500">No organizations found.</div>}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="rounded-lg border bg-white px-4 py-2 disabled:opacity-50">Previous</button>
        <span className="text-sm text-gray-600">Page {currentPage} of {totalPages || 1}</span>
        <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(currentPage + 1)} className="rounded-lg border bg-white px-4 py-2 disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}
export default Organizations;

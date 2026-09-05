import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./pages/Dashboard";
import Tenants from "./pages/Tenants";
import TenantDetails from "./pages/TenantDetails";
import EditTenant from "./pages/EditTenant";
import Organizations from "./pages/Organizations";
import CreateOrganization from "./pages/CreateOrganization";
import OrganizationDetails from "./pages/OrganizationDetails";
import Users from "./pages/Users";
import CreateUser from "./pages/CreateUser";
import UserDetails from "./pages/UserDetails";
import Roles from "./pages/Roles";
import CreateRole from "./pages/CreateRole";
import RoleDetails from "./pages/RoleDetails";
import Permissions from "./pages/Permissions";
import DataPermissions from "./pages/DataPermissions";
import FeatureManagement from "./pages/FeatureManagement";

function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tenants" element={<Tenants />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/organizations/new" element={<CreateOrganization />} />
        <Route path="/organizations/:id" element={<OrganizationDetails />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/new" element={<CreateUser />} />
        <Route path="/users/:id" element={<UserDetails />} />

        {/* Access Management */}
        <Route path="/roles" element={<Roles />} />
        <Route path="/roles/new" element={<CreateRole />} />
        <Route path="/roles/:id" element={<RoleDetails />} />
        <Route path="/permissions" element={<Permissions />} />
        <Route path="/data-permissions" element={<DataPermissions />} />
        <Route path="/features" element={<FeatureManagement />} />

        <Route path="/tenants/:id" element={<TenantDetails />} />
        <Route path="/tenants/:id/edit" element={<EditTenant />} />
      </Route>
    </Routes>
  );
}

export default App;

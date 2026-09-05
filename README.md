# Super Admin Portal

## Super Admin Features

1. **Dashboard** - Monitor overall platform statistics and health.
2. **Tenant Management** - View, create, update, activate and deactivate tenants.
3. **Organization Management** - Manage organizations and their status across tenants.
4. **User Management** - Manage users, roles, organizations and account status.

### Access Management
- Role Management
- Permission Management
- Data Permissions


## Users, Organizations & Roles API

The Super Admin portal now uses the same API + TanStack Query pattern already used by Tenants and Dashboard.

### Organizations
- `GET /api/organizations`
- `GET /api/organizations/:id`
- `POST /api/organizations`
- `PUT /api/organizations/:id`
- `PATCH /api/organizations/:id/activate`
- `PATCH /api/organizations/:id/deactivate`

### Users
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PUT /api/users/:id`
- `PATCH /api/users/:id/activate`
- `PATCH /api/users/:id/deactivate`

### Roles
- `GET /api/roles`
- `GET /api/roles/:id`
- `POST /api/roles`
- `PUT /api/roles/:id`
- `PATCH /api/roles/:id/activate`
- `PATCH /api/roles/:id/deactivate`

Frontend API modules are under `frontend/src/api/`, and TanStack Query hooks are under `frontend/src/hooks/`. Create/update/status mutations invalidate the related query keys so the pages refresh from the backend after every change.

> Note: The current backend stores data in JavaScript arrays, matching the existing Tenant implementation. This is suitable for the current demo/prototype; production persistence should use a database.

import React from "react";

import { useDashboardStats } from "../hooks/useDashboardStats";
import { usePlatformHealth } from "../hooks/usePlatformHealth";
import { useAnalytics } from "../hooks/useAnalytics";
import { useRecentActivities } from "../hooks/useRecentActivities";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
  } = useDashboardStats();

  const {
    data: health,
    isLoading: healthLoading,
    isError: healthError,
  } = usePlatformHealth();

  const {
    data: analytics,
    isLoading: analyticsLoading,
    isError: analyticsError,
  } = useAnalytics();

  const {
    data: activities,
    isLoading: activitiesLoading,
    isError: activitiesError,
  } = useRecentActivities();
 
  if (
    statsLoading ||
    healthLoading ||
    analyticsLoading ||
    activitiesLoading
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium text-gray-600">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (
    statsError ||
    healthError ||
    analyticsError ||
    activitiesError
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium text-red-600">
          Failed to load dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          Super Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Monitor your platform and manage tenants
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

        <div className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Tenants
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            {stats.totalTenants}
          </h2>
        </div>

        <div className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Active Tenants
          </p>

          <h2 className="mt-2 text-2xl font-bold text-green-600">
            {stats.activeTenants}
          </h2>
        </div>

        <div className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Inactive Tenants
          </p>

          <h2 className="mt-2 text-2xl font-bold text-red-600">
            {stats.inactiveTenants}
          </h2>
        </div>

        <div className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Users
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            {stats.totalUsers.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Active Licenses
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            {stats.activeLicenses}
          </h2>
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* PLATFORM HEALTH */}
        <div className="rounded-lg bg-white p-5 shadow-sm">

          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Platform Health
          </h2>

          <div className="space-y-4">

            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-gray-600">
                API Gateway
              </span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {health.apiGateway}
              </span>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-gray-600">
                Database
              </span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {health.database}
              </span>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-gray-600">
                Server
              </span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {health.server}
              </span>
            </div>

            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span>Storage</span>
                <span>{health.storage}%</span>
              </div>

              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${health.storage}%` }}
                />
              </div>
            </div>

            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span>CPU Usage</span>
                <span>{health.cpu}%</span>
              </div>

              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-yellow-500"
                  style={{ width: `${health.cpu}%` }}
                />
              </div>
            </div>

            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span>Memory Usage</span>
                <span>{health.memory}%</span>
              </div>

              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-purple-500"
                  style={{ width: `${health.memory}%` }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* RECENT ACTIVITIES */}
        <div className="rounded-lg bg-white p-5 shadow-sm">

          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Recent Activities
          </h2>

          <div className="space-y-4">

            {activities.map((activity) => (
              <div
                key={activity.id}
                className="border-b pb-3 last:border-b-0"
              >
                <p className="font-medium text-gray-700">
                  {activity.message}
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  {activity.time}
                </p>
              </div>
            ))}

          </div>
        </div>

      </div>

      {/* ANALYTICS */}
      <div className="mt-6 rounded-lg bg-white p-5 shadow-sm">

        <h2 className="mb-5 text-xl font-semibold text-gray-800">
          Tenant Growth
        </h2>

        <div className="h-64 w-full sm:h-80">

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics.tenantGrowth}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="tenants"
                strokeWidth={2}
              />

            </LineChart>
          </ResponsiveContainer>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;
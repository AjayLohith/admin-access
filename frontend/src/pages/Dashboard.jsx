import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserList from '../components/UserList';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'Admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome, {user?.name} ({user?.role})
              </h1>
              <p className="text-gray-600 mt-1">
                {isAdmin
                  ? 'Admin Dashboard - View all registered users'
                  : 'User Dashboard - View registered users'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Admin-specific header */}
        {isAdmin && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-yellow-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-yellow-800 font-medium">
                Admin Mode: You can view all registered users.
              </p>
            </div>
          </div>
        )}

        {/* User Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className={`p-6 rounded-lg shadow-md ${isAdmin ? 'bg-purple-50' : 'bg-indigo-50'}`}>
            <h3 className={`text-lg font-semibold mb-2 ${isAdmin ? 'text-purple-900' : 'text-indigo-900'}`}>
              User Information
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-medium">Name:</span> {user?.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {user?.email}
              </p>
              <p>
                <span className="font-medium">Role:</span>{' '}
                <span
                  className={`inline-block px-2 py-1 rounded text-sm ${
                    isAdmin
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}
                >
                  {user?.role}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Account Status
            </h3>
            <p className="text-gray-700 mb-4">
              Your account is active and ready to use.
            </p>
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Active
            </span>
          </div>

        </div>

        {/* User List Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

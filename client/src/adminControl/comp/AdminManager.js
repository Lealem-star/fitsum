import React, { useState } from 'react';
import api from '../../config/api';

const AdminManager = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [createdAdmin, setCreatedAdmin] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setCreatedAdmin(null);

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setSuccess('Admin account created successfully!');
      setCreatedAdmin({
        name: response.data.user.name,
        email: response.data.user.email,
        password: formData.password, // Store temporarily to show
      });
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create admin account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Create New Admin</h2>
        <p className="text-gray-600">Create a new admin account and share the credentials with them.</p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && createdAdmin && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          <p className="font-semibold mb-2">{success}</p>
          <div className="bg-white p-4 rounded border border-green-300 mt-2">
            <p className="text-sm font-medium mb-2">Share these credentials with the new admin:</p>
            <div className="space-y-1 text-sm">
              <p><strong>Name:</strong> {createdAdmin.name}</p>
              <p><strong>Email:</strong> {createdAdmin.email}</p>
              <p><strong>Password:</strong> <span className="font-mono bg-gray-100 px-2 py-1 rounded">{createdAdmin.password}</span></p>
            </div>
            <p className="text-xs text-gray-600 mt-3">
              ⚠️ Make sure to save these credentials securely. The password cannot be retrieved later.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#61dafb] focus:border-[#61dafb]"
              placeholder="Enter admin's full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#61dafb] focus:border-[#61dafb]"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#61dafb] focus:border-[#61dafb]"
              placeholder="Minimum 6 characters"
            />
            <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#61dafb] focus:border-[#61dafb]"
              placeholder="Re-enter password"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-6 py-2 bg-[#61dafb] text-white rounded-lg hover:bg-[#4fa8c5] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Creating...' : 'Create Admin Account'}
            </button>
          </div>
        </div>
      </form>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> After creating an admin account, share the credentials securely with the new admin. 
          They can login at <code className="bg-blue-100 px-1 rounded">/admin-portal/login</code> using the email and password you provide.
        </p>
      </div>
    </div>
  );
};

export default AdminManager;


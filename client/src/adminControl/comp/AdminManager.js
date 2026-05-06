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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const passwordStrength = (() => {
    const value = formData.password || '';
    if (!value) return { label: 'No password', tone: 'text-gray-500', bar: 'w-0 bg-gray-300' };
    if (value.length < 6) return { label: 'Weak', tone: 'text-red-600', bar: 'w-1/3 bg-red-500' };
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSymbol = /[^a-zA-Z0-9]/.test(value);
    if (hasLetter && hasNumber && hasSymbol && value.length >= 10) {
      return { label: 'Strong', tone: 'text-emerald-600', bar: 'w-full bg-emerald-500' };
    }
    return { label: 'Medium', tone: 'text-amber-600', bar: 'w-2/3 bg-amber-500' };
  })();

  const passwordsMatch = formData.confirmPassword.length > 0 && formData.password === formData.confirmPassword;

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Create New Admin</h2>
        <p className="text-slate-600">Create a secure admin account and share credentials with care.</p>
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

      <form onSubmit={handleSubmit} className="bg-white/95 rounded-2xl shadow-[0_14px_35px_rgba(15,23,42,0.1)] border border-slate-200/70 p-6 max-w-3xl">
        <div className="space-y-6">
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-500">Basic Info</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold tracking-wide text-slate-600 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4.4 0-8 2-8 4.5V20h16v-1.5c0-2.5-3.6-4.5-8-4.5z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition"
                    placeholder="Enter admin's full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wide text-slate-600 mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16v12H4V6zm0 1l8 6 8-6" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-500">Security</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold tracking-wide text-slate-600 mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 10V8a5 5 0 1110 0v2m-9 0h8a1 1 0 011 1v8H7v-8a1 1 0 011-1z" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full pl-10 pr-12 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition"
                    placeholder="Minimum 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-600 hover:text-slate-900 px-2 py-1 rounded-md"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div className="mt-2">
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-300 ${passwordStrength.bar}`} />
                  </div>
                  <p className={`text-xs mt-1 ${passwordStrength.tone}`}>
                    Strength: {passwordStrength.label}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wide text-slate-600 mb-1.5">
                  Confirm Password *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 10V8a5 5 0 1110 0v2m-9 0h8a1 1 0 011 1v8H7v-8a1 1 0 011-1z" />
                    </svg>
                  </span>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full pl-10 pr-12 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition"
                    placeholder="Re-enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-600 hover:text-slate-900 px-2 py-1 rounded-md"
                  >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <p className={`text-xs mt-2 ${passwordsMatch ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {passwordsMatch ? 'Passwords match.' : 'Re-enter password to confirm.'}
                </p>
              </div>
            </div>
          </section>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-7 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-600 text-white rounded-xl hover:scale-[1.02] hover:from-cyan-400 hover:to-violet-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed font-semibold shadow-lg shadow-violet-500/20"
            >
              {loading ? 'Creating...' : 'Create Admin'}
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


import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fitsumImage from '../../assets/fitsumf.png';
import { AuthContext } from '../../context/AuthContext';

const AdminPortal = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const openLoginModal = () => {
    setError('');
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setError('');
    setIsLoginModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);
    if (result.success) {
      closeLoginModal();
      navigate('/admin');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="min-h-screen relative overflow-hidden text-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_55%)]" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_50%)]" aria-hidden />

        <div className="relative z-10 px-4 sm:px-6 lg:px-12 py-6">
          <header className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <img
                src={fitsumImage}
                alt="Fitsum logo"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-cyan-400/60"
              />
              <span className="text-sm sm:text-base font-semibold text-slate-900">
                Fitsum Admin
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                to="/"
                className="text-sm sm:text-base font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                ← Back to Website
              </Link>
              <button
                type="button"
                onClick={openLoginModal}
                className="inline-flex items-center justify-center bg-cyan-400 text-slate-950 font-semibold px-4 sm:px-6 py-2.5 rounded-md hover:bg-cyan-300 transition-colors duration-200"
              >
                Login
              </button>
            </div>
          </header>
        </div>

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-12 pt-4 lg:pt-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <section className="space-y-6">
              <p className="inline-flex items-center rounded-full border border-cyan-500/30 bg-white/60 backdrop-blur-sm px-4 py-1.5 text-sm text-slate-800">
                Fitsum Fiseha Administration
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                Welcome to the Admin Portal
              </h1>
              <p className="text-base sm:text-lg text-slate-700 max-w-xl leading-relaxed">
                Manage website content, review communication updates, and keep everything running smoothly from one place.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 max-w-2xl">
                <div className="bg-white/70 backdrop-blur-sm border border-white/40 rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-slate-600">Access</p>
                  <p className="text-lg font-semibold">Secure Login</p>
                </div>
                <div className="bg-white/70 backdrop-blur-sm border border-white/40 rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-slate-600">Management</p>
                  <p className="text-lg font-semibold">Content Control</p>
                </div>
                <div className="bg-white/70 backdrop-blur-sm border border-white/40 rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-slate-600">Support</p>
                  <p className="text-lg font-semibold">Fanbase Emailing</p>
                </div>
              </div>

              <button
                type="button"
                onClick={openLoginModal}
                className="inline-flex items-center justify-center bg-slate-900 text-white font-semibold px-7 py-3 rounded-md hover:bg-slate-800 transition-colors duration-200"
              >
                Enter Admin Dashboard
              </button>
            </section>

            <section className="w-full">
              <div className="relative ">
                <img
                  src={fitsumImage}
                  alt="Fitsum Fiseha"
                  className="w-full h-full"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-sm text-white/90">Admin Welcome Screen</p>
                  <p className="text-2xl font-bold text-white">Fitsum Fiseha</p>
                </div>

              </div>
            </section>
          </div>
        </main>
      </div>

      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <button
            type="button"
            aria-label="Close login modal"
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={closeLoginModal}
          />

          <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-2xl p-6 sm:p-7 text-slate-900">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold">Admin Login</h2>
              <button
                type="button"
                onClick={closeLoginModal}
                className="text-slate-500 hover:text-slate-800 text-xl leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <p className="text-sm text-slate-600 mb-5">
              Sign in to access the admin dashboard.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1.5">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-500 text-slate-950 font-semibold py-2.5 rounded-md hover:bg-cyan-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default AdminPortal;


import React, { useState, useEffect } from 'react';
import api from '../../config/api';

const EmailCaptureBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Show banner if user hasn't subscribed
  useEffect(() => {
    const hasSubscribed = localStorage.getItem('emailSubscribed');
    const bannerClosed = sessionStorage.getItem('emailBannerClosed');
    
    if (!hasSubscribed && !bannerClosed) {
      setShowBanner(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await api.post('/api/subscribers/subscribe', {
        email,
        name: name || undefined,
        source: 'homepage',
      });

      setMessage(response.data.message);
      localStorage.setItem('emailSubscribed', 'true');
      
      setTimeout(() => {
        setShowBanner(false);
        setEmail('');
        setName('');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowBanner(false);
    sessionStorage.setItem('emailBannerClosed', 'true');
  };

  if (!showBanner) return null;

  return (
    <div className="bg-gradient-to-r from-[#61dafb] to-[#4fa8c5] text-white py-3 px-4 shadow-lg relative z-[998]">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <p className="font-semibold mb-1">Join Mahlet's Family!</p>
          <p className="text-sm opacity-90">Get updates about her latest work and opportunities</p>
        </div>

        {message ? (
          <div className="text-sm font-medium">{message}</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="px-3 py-2 rounded text-gray-800 text-sm min-w-[200px] focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-[#61dafb] px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? 'Joining...' : 'Subscribe'}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="text-white hover:text-gray-200 text-xl font-bold"
            >
              ×
            </button>
          </form>
        )}

        {error && (
          <div className="w-full text-sm bg-red-500 px-3 py-2 rounded mt-2">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailCaptureBanner;


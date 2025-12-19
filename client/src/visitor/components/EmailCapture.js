import React, { useState, useEffect } from 'react';
import api from '../../config/api';

const EmailCapture = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Show modal after 3 seconds or if user hasn't subscribed
  useEffect(() => {
    const hasSubscribed = localStorage.getItem('emailSubscribed');
    const timer = setTimeout(() => {
      if (!hasSubscribed) {
        setShowModal(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
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
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setShowModal(false);
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
    setShowModal(false);
    // Don't show again for this session
    sessionStorage.setItem('emailModalClosed', 'true');
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Join Mahlet's Family! 🎬
          </h2>
          <p className="text-gray-600">
            Get updates about her latest work, projects, and opportunities to collaborate.
          </p>
        </div>

        {message ? (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#61dafb] focus:border-[#61dafb]"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name (Optional)
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#61dafb] focus:border-[#61dafb]"
                placeholder="Your name"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#61dafb] text-white py-2 px-4 rounded-md hover:bg-[#4fa8c5] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Joining...' : 'Join the Family'}
            </button>

            <p className="text-xs text-gray-500 text-center">
              By subscribing, you agree to receive updates. You can unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmailCapture;


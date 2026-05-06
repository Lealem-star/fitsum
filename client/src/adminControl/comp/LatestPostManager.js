import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify'; // Removed 'toast' import
import 'react-toastify/dist/ReactToastify.css';
import { showConfirmationToast } from '../../utils/toastUtils'; // Added showConfirmationToast import
import api from '../../config/api';

const LatestPostManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    type: 'youtube',
    mediaUrl: '',
    isActive: true,
  });

  const getYouTubeVideoId = (url = '') => {
    const value = String(url).trim();
    if (!value) return '';
    if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;

    try {
      const parsed = new URL(value);
      const host = parsed.hostname.replace('www.', '');

      if (host === 'youtu.be') {
        return parsed.pathname.split('/').filter(Boolean)[0] || '';
      }

      if (host.endsWith('youtube.com')) {
        if (parsed.pathname.startsWith('/watch')) {
          return parsed.searchParams.get('v') || '';
        }
        if (parsed.pathname.startsWith('/shorts/')) {
          return parsed.pathname.split('/shorts/')[1]?.split('/')[0] || '';
        }
        if (parsed.pathname.startsWith('/embed/')) {
          return parsed.pathname.split('/embed/')[1]?.split('/')[0] || '';
        }
      }
    } catch (err) {
      return '';
    }

    return '';
  };

  const getYouTubeEmbedUrl = (url = '') => {
    const id = getYouTubeVideoId(url);
    return id ? `https://www.youtube.com/embed/${id}` : '';
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await api.get('/api/latest-posts/admin', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      if (error.response?.status === 401) {
        // toast.error('Session expired. Please login again.'); // Original toast error
        window.location.href = '/login';
      } else {
        // toast.error('Failed to fetch posts'); // Original toast error
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const normalizedYoutubeUrl =
        formData.type === 'youtube' ? getYouTubeEmbedUrl(formData.mediaUrl) : '';

      if (formData.type === 'youtube' && !normalizedYoutubeUrl) {
        setError('Please provide a valid YouTube URL (watch, shorts, youtu.be, or embed).');
        return;
      }

      const submitData = new FormData();
      
      submitData.append('title', formData.title);
      submitData.append('body', formData.body);
      submitData.append('type', 'youtube');
      submitData.append('isActive', formData.isActive);
      submitData.append('mediaUrl', normalizedYoutubeUrl);

      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      if (editingPost) {
        await api.put(`/api/latest-posts/${editingPost._id}`, submitData, { headers });
        // toast.success('Post updated successfully!'); // Original toast success
      } else {
        await api.post('/api/latest-posts', submitData, { headers });
        // toast.success('Post created successfully!'); // Original toast success
      }
      
      setFormData({ title: '', body: '', type: 'youtube', mediaUrl: '', isActive: true });
      setEditingPost(null);
      setShowForm(false);
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      setError(error.response?.data?.message || error.message || 'Failed to save post');
      // const errorMessage = error.response?.data?.message || error.message || 'Failed to save post'; // Original error message
      // toast.error(errorMessage); // Original toast error
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title || '',
      body: post.body || '',
      type: 'youtube',
      mediaUrl: post.mediaUrl || '',
      isActive: post.isActive,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => { // Removed 'async' and 'window.confirm'
    showConfirmationToast('Are you sure you want to delete this post?', async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        await api.delete(`/api/latest-posts/${id}`, { headers });
        // toast.success('Post deleted successfully!'); // Original toast success
        fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
        // toast.error('Failed to delete post'); // Original toast error
      }
    });
  };

  const handleCancel = () => {
    setFormData({ title: '', body: '', type: 'youtube', mediaUrl: '', isActive: true });
    setEditingPost(null);
    setShowForm(false);
  };

  const youtubePosts = posts.filter((post) => post.type === 'youtube');

  if (loading) {
    return <div className="text-center py-10 text-gray-600 text-xl">Loading posts...</div>;
  }

  return (
    <>
    <div className="w-full">
      <div className="flex justify-between mb-8 md:flex-row flex-col items-start md:items-center md:gap-0 gap-4">
        <h2 className="m-0 text-gray-800">YouTube Video Posts</h2>
        <button 
          className="px-5 py-2.5 border-none rounded cursor-pointer text-base transition-all duration-300 bg-[#61dafb] text-white hover:bg-[#4fa8c5]"
          onClick={() => {
            setEditingPost(null);
            setFormData({ title: '', body: '', type: 'youtube', mediaUrl: '', isActive: true });
            setShowForm(true);
          }}
        >
          + Add YouTube Video
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
          <form onSubmit={handleSubmit}>
            <h3 className="mt-0 mb-5 text-gray-800 text-2xl">{editingPost ? 'Edit YouTube Video' : 'Add YouTube Video'}</h3>
            {error && (
              <div className="mb-4 p-3 rounded border border-red-200 bg-red-50 text-red-700 text-sm">
                {error}
              </div>
            )}
            <div className="mb-5">
              <label className="block mb-2 text-gray-800 font-medium">YouTube URL:</label>
              <input
                type="text"
                name="mediaUrl"
                value={formData.mediaUrl}
                onChange={handleChange}
                placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/... or /shorts/..."
                className="w-full p-2.5 border border-gray-300 rounded text-base box-border focus:outline-none focus:border-[#61dafb] focus:ring-2 focus:ring-[#61dafb]/20"
              />
              {formData.mediaUrl && (
                <div className="mt-4 text-center">
                  {(() => {
                    const embedUrl = getYouTubeEmbedUrl(formData.mediaUrl);
                    if (!embedUrl) {
                      return (
                        <p className="text-sm text-red-500 mt-2">
                          Invalid YouTube URL. Use watch, shorts, youtu.be, or embed link.
                        </p>
                      );
                    }
                    return (
                      <iframe
                        src={embedUrl}
                        className="max-w-full w-full h-[300px] rounded-lg shadow-md mt-2.5"
                        frameBorder="0"
                        allowFullScreen
                        title="YouTube preview"
                      />
                    );
                  })()}
                </div>
              )}
            </div>

            <div className="mb-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-[18px] h-[18px] cursor-pointer"
                />
                Active
              </label>
            </div>

            <div className="flex gap-2.5 mt-6">
              <button type="submit" className="px-5 py-2.5 border-none rounded cursor-pointer text-base transition-all duration-300 bg-[#61dafb] text-white hover:bg-[#4fa8c5]">
                {editingPost ? 'Update Video' : 'Create Video'}
              </button>
              <button type="button" className="px-5 py-2.5 border-none rounded cursor-pointer text-base transition-all duration-300 bg-gray-500 text-white hover:bg-gray-600" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-8">
        {youtubePosts.length === 0 ? (
          <div className="text-center py-16 px-5 text-gray-400 text-lg">No YouTube videos found. Add your first video!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-5">
            {youtubePosts.map((post) => (
              <div key={post._id} className={`bg-white border border-gray-200 rounded-lg overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md ${!post.isActive ? 'opacity-60' : ''}`}>
                <div className="relative w-full bg-black">
                  {post.mediaUrl && (
                    <iframe
                      src={getYouTubeEmbedUrl(post.mediaUrl)}
                      className="w-full h-[250px]"
                      frameBorder="0"
                      allowFullScreen
                      title={post.title || 'YouTube video'}
                    />
                  )}
                  {!post.isActive && <div className="absolute top-2.5 right-2.5 bg-red-600 text-white px-2.5 py-1.5 rounded text-xs font-bold">Inactive</div>}
                </div>
                <div className="p-4">
                  <p className="font-semibold text-gray-800 m-0 mb-2 capitalize">Type: youtube</p>
                  {post.title && <p className="text-gray-800 text-base m-0 mb-2 font-semibold">{post.title}</p>}
                  {post.body && <p className="text-gray-600 text-sm m-0 mb-2">{post.body}</p>}
                  <p className="text-gray-400 text-xs m-0">Created: {new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="p-4 border-t border-gray-200 flex gap-2.5">
                  <button 
                    className="px-4 py-2 bg-green-600 text-white text-sm rounded transition-colors duration-300 hover:bg-green-700"
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>
                  <button 
                    className="px-4 py-2 bg-red-600 text-white text-sm rounded transition-colors duration-300 hover:bg-red-700"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    <ToastContainer />
  </>);
};

export default LatestPostManager;

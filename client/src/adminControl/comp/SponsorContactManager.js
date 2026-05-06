import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showConfirmationToast } from '../../utils/toastUtils';
import api from '../../config/api';

const extractContactFields = (notes = '') => {
  const lines = String(notes).split('\n');
  const result = {
    organization: '',
    phone: '',
    website: '',
    message: '',
  };

  const remaining = [];
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (/^Organization:/i.test(trimmed)) {
      result.organization = trimmed.replace(/^Organization:\s*/i, '');
      return;
    }
    if (/^Phone:/i.test(trimmed)) {
      result.phone = trimmed.replace(/^Phone:\s*/i, '');
      return;
    }
    if (/^Website:/i.test(trimmed)) {
      result.website = trimmed.replace(/^Website:\s*/i, '');
      return;
    }
    if (trimmed) remaining.push(trimmed);
  });

  result.message = remaining.join('\n');
  return result;
};

const SponsorContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const params = { source: 'partner' };
      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await api.get('/api/subscribers/admin', { params });
      const sorted = response.data.sort((a, b) => {
        if (a.read !== b.read) return a.read ? 1 : -1;
        return new Date(b.createdAt || b.subscribedAt) - new Date(a.createdAt || a.subscribedAt);
      });
      setContacts(sorted);
    } catch (error) {
      console.error('Error fetching sponsor contacts:', error);
      toast.error('Failed to fetch sponsor contacts');
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleMarkAsRead = async (id, currentReadStatus) => {
    try {
      await api.put(`/api/subscribers/admin/${id}`, { read: !currentReadStatus });
      toast.success(currentReadStatus ? 'Marked as unread' : 'Marked as read');
      fetchContacts();
    } catch (error) {
      console.error('Error updating read status:', error);
      toast.error('Failed to update read status');
    }
  };

  const handleDelete = (id) => {
    showConfirmationToast('Delete this sponsor contact?', async (closeToast) => {
      try {
        await api.delete(`/api/subscribers/admin/${id}`);
        toast.success('Sponsor contact deleted');
        fetchContacts();
      } catch (error) {
        console.error('Error deleting sponsor contact:', error);
        toast.error('Failed to delete sponsor contact');
      } finally {
        closeToast();
      }
    });
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-600 text-xl">Loading sponsor contacts...</div>;
  }

  return (
    <>
      <div className="w-full">
        <div className="flex flex-row items-center justify-between gap-4 mb-8">
          <h2 className="m-0 text-gray-800 text-xl md:text-2xl font-semibold flex-shrink-0">Sponsor Contacts</h2>
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded text-sm md:text-base focus:outline-none focus:border-[#61dafb] focus:ring-2 focus:ring-[#61dafb]/20"
            />
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {contacts.length === 0 ? (
            <div className="text-center py-16 px-5 text-gray-400 text-lg">
              No sponsor contacts found.
            </div>
          ) : (
            contacts.map((contact) => {
              const fields = extractContactFields(contact.notes);
              return (
                <div
                  key={contact._id}
                  className={`bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow ${
                    !contact.read ? 'border-blue-400 bg-blue-50/30' : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-800 m-0">{contact.name || 'Anonymous'}</h3>
                        {!contact.read ? (
                          <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded-full">NEW</span>
                        ) : (
                          <span className="px-2 py-0.5 bg-gray-300 text-gray-700 text-xs rounded-full">READ</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 m-0">{contact.email}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-xs text-gray-500 m-0">
                        {new Date(contact.createdAt || contact.subscribedAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-400 m-0 mt-1">
                        {new Date(contact.createdAt || contact.subscribedAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-xs text-gray-500 mb-1">Organization</p>
                      <p className="text-sm text-gray-800 break-words">{fields.organization || '-'}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-xs text-gray-500 mb-1">Phone</p>
                      <p className="text-sm text-gray-800 break-words">{fields.phone || '-'}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-xs text-gray-500 mb-1">Website</p>
                      {fields.website ? (
                        <a
                          href={fields.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-700 break-words"
                        >
                          {fields.website}
                        </a>
                      ) : (
                        <p className="text-sm text-gray-800 break-words">-</p>
                      )}
                    </div>
                  </div>

                  {fields.message && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">Message</p>
                      <p className="text-sm text-gray-600 whitespace-pre-wrap bg-gray-50 rounded p-3">{fields.message}</p>
                    </div>
                  )}

                  <div className="flex gap-2 mt-4">
                    <button
                      className={`px-4 py-2 text-white text-sm rounded transition-colors duration-300 ${
                        contact.read ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
                      }`}
                      onClick={() => handleMarkAsRead(contact._id, contact.read)}
                    >
                      {contact.read ? 'Mark as Unread' : 'Mark as Read'}
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-white text-sm rounded transition-colors duration-300 hover:bg-red-700"
                      onClick={() => handleDelete(contact._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SponsorContactManager;

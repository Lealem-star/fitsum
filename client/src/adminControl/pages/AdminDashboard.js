import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageManager from '../comp/ImageManager';
import HeroImageManager from '../comp/HeroImageManager';
import VideoManager from '../comp/VideoManager';
import SubscriberManager from '../comp/SubscriberManager';
import LatestPostManager from '../comp/LatestPostManager';
import ContactMessagesManager from '../comp/ContactMessagesManager';
import SponsorContactManager from '../comp/SponsorContactManager';
import AdminManager from '../comp/AdminManager';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api'; // Import the api utility

const navItems = [
  {
    id: 'headerpost',
    label: 'HeaderPost',
    icon: 'media',
    section: 'main',
    description: 'Upload header poster images and videos.',
    subTabs: [
      { id: 'images', label: 'Images' },
      { id: 'videos', label: 'Videos' },
    ],
  },
  {
    id: 'homehero',
    label: 'Home Hero',
    icon: 'home',
    section: 'main',
    description: 'Upload images for the home page hero section.',
  },
  {
    id: 'latest',
    label: 'Videos',
    icon: 'latest',
    section: 'main',
    description: 'Upload and manage YouTube videos.',
  },
  {
    id: 'myfan',
    label: 'MyFan',
    icon: 'fan',
    section: 'community',
    description: 'Manage user messages and mailing list.',
    subTabs: [
      { id: 'subscribers', label: 'Mailing List' },
      { id: 'messages', label: 'Contact Messages' },
    ],
  },
  {
    id: 'sponsors',
    label: 'Sponsors',
    icon: 'sponsor',
    section: 'community',
    description: 'Manage sponsor contacts from home page.',
  },
  {
    id: 'admins',
    label: 'Admins',
    icon: 'admins',
    section: 'system',
    description: 'Create and manage admin accounts.',
  },
];

const navSections = [
  { id: 'main', label: 'Main' },
  { id: 'community', label: 'Community' },
  { id: 'system', label: 'System' },
];

const IconBadge = ({ icon, active }) => {
  const iconClass = active ? 'text-blue-400' : 'text-slate-400';

  if (icon === 'media') {
    return (
      <svg className={`w-4 h-4 ${iconClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M4 17h10M14 14l6 3-6 3v-6zM6 4h12a2 2 0 012 2v6H4V6a2 2 0 012-2z" />
      </svg>
    );
  }
  if (icon === 'home') {
    return (
      <svg className={`w-4 h-4 ${iconClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 11.5L12 4l9 7.5M6.5 10.5V20h11v-9.5" />
      </svg>
    );
  }
  if (icon === 'latest') {
    return (
      <svg className={`w-4 h-4 ${iconClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l2.5 2.5M21 12a9 9 0 11-2.64-6.36" />
      </svg>
    );
  }
  if (icon === 'fan') {
    return (
      <svg className={`w-4 h-4 ${iconClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11a4 4 0 10-8 0m8 0a4 4 0 014 4v1H4v-1a4 4 0 014-4m8 0v-1a4 4 0 10-8 0v1" />
      </svg>
    );
  }
  if (icon === 'sponsor') {
    return (
      <svg className={`w-4 h-4 ${iconClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 10V7a2 2 0 012-2h8a2 2 0 012 2v3m-1 10H7a2 2 0 01-2-2v-8h14v8a2 2 0 01-2 2zM9 14h6" />
      </svg>
    );
  }

  return (
    <svg className={`w-4 h-4 ${iconClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 2l7 3v6c0 5-3.5 9.5-7 11-3.5-1.5-7-6-7-11V5l7-3z" />
    </svg>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('headerpost');
  const [activeSubTab, setActiveSubTab] = useState('images');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileError, setProfileError] = useState('');
  const { user, logout, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const avatarUrl = user?.avatar;
  const [unreadMessageCount, setUnreadMessageCount] = useState(0); // Renamed for clarity

  useEffect(() => {
    let mounted = true;
    let timerId = null;

    async function fetchUnreadMessageCount() {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await api.get('/api/subscribers/admin/unread-contact-count', { headers });
        if (mounted) {
          setUnreadMessageCount(response.data.count || 0);
        }
      } catch (err) {
        console.error('Error fetching unread message count:', err);
        if (mounted) {
          setUnreadMessageCount(0); // Reset count on error
        }
      }
    }

    // Initial fetch
    fetchUnreadMessageCount();
    // Poll every 5s for near real-time updates
    timerId = setInterval(fetchUnreadMessageCount, 5000);

    return () => {
      mounted = false;
      if (timerId) clearInterval(timerId);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <React.Fragment>
      <div className="min-h-screen p-5 relative">
      

      {/* Mobile Top Bar - Menu Button and Welcome Section (Mobile Only) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-[1000] bg-white bg-opacity-95 backdrop-blur-sm shadow-lg">
        <div className="flex items-center justify-between p-4 gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-lg focus:outline-none flex-shrink-0"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-[#61dafb] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-[#61dafb] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-[#61dafb] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>

          {/* Welcome Section - Mobile Only */}
          <div className="flex-1 min-w-0 flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs text-gray-500 truncate">Welcome back</p>
              <h1 className="text-lg font-semibold text-gray-900 truncate">Hi {user?.name || 'Admin'}, let's build.</h1>
            </div>
            <button
              aria-label="View messages"
              className="ml-3 relative w-9 h-9 flex items-center justify-center rounded-full bg-white/80 hover:bg-white"
              onClick={() => {
                setActiveTab('myfan');
                setActiveSubTab('messages');
                closeMobileMenu();
                // Optionally refetch count or decrement if navigating to messages
              }}
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadMessageCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold leading-none text-white bg-red-600 rounded-full border border-white">{unreadMessageCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[998] lg:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white backdrop-blur-sm shadow-2xl z-[999] transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ borderRight: '3px solid rgba(34,211,238,0.24)' }}
      >
        <div className="flex flex-col h-full">
            <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-gray-300">Fitsum Studio</p>
              </div>
              <button
                onClick={closeMobileMenu}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <nav className="space-y-5">
              {navSections.map((section) => (
                <div key={section.id}>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400 mb-2 px-2">{section.label}</p>
                  <div className="space-y-1">
                    {navItems.filter((item) => item.section === section.id).map((item) => {
                      const isActive = activeTab === item.id;
                      return (
                        <div key={item.id}>
                          <button
                            onClick={() => {
                              setActiveTab(item.id);
                              if (item.subTabs && item.subTabs.length > 0) {
                                setActiveSubTab(item.subTabs[0].id);
                              }
                              closeMobileMenu();
                            }}
                            className={`group w-full text-left px-3 py-2.5 rounded-xl transition-all duration-200 relative border-l-2 ${
                              isActive
                                ? 'bg-blue-500/12 border-blue-500 text-slate-100 shadow-[0_0_12px_rgba(59,130,246,0.4)]'
                                : 'border-transparent text-slate-200 hover:bg-white/5 hover:translate-x-1'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <IconBadge icon={item.icon} active={isActive} />
                              <p className="font-medium">{item.label}</p>
                            </div>
                          </button>
                          {isActive && item.subTabs && item.subTabs.length > 0 && (
                            <div className="mt-1 ml-8 space-y-1">
                              {item.subTabs.map((subTab) => (
                                <button
                                  key={subTab.id}
                                  onClick={() => {
                                    setActiveSubTab(subTab.id);
                                    closeMobileMenu();
                                  }}
                                  className={`w-full text-left px-2 py-1 rounded-md text-sm transition ${
                                    activeSubTab === subTab.id
                                      ? 'text-cyan-300'
                                      : 'text-slate-300 hover:text-slate-100'
                                  }`}
                                >
                                  • {subTab.label}
                                  {subTab.id === 'messages' && unreadMessageCount > 0 && (
                                    <span className="ml-2 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white bg-red-600 rounded-full">
                                      {unreadMessageCount}
                                    </span>
                                  )}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          <div className="p-6 border-t border-white/10 bg-transparent">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProfileMenu((v) => !v)}
                className="flex items-center gap-3 w-full text-left"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#61dafb] to-[#4fa8c5] text-white flex items-center justify-center text-lg font-semibold border-2 border-white shadow">
                    {(user?.name || 'Admin').slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-300">Signed in</p>
                  <p className="text-base font-semibold text-white">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-300 mt-0.5">System Admin</p>
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-20">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      setNameInput(user?.name || '');
                      setAvatarFile(null);
                      setAvatarPreview(avatarUrl || '');
                      setProfileError('');
                      setShowEditModal(true);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                      navigate('/');
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      <div className="relative z-10 flex flex-col lg:flex-row gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-72 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white rounded-2xl shadow-2xl flex-col justify-between" style={{ border: '3px solid rgba(34,211,238,0.2)' }}>
          <div className="p-6 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-gray-300">Fitsum Studio</p>
              
            </div>
            <nav className="space-y-5">
              {navSections.map((section) => (
                <div key={section.id}>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400 mb-2 px-2">{section.label}</p>
                  <div className="space-y-1">
                    {navItems.filter((item) => item.section === section.id).map((item) => {
                      const isActive = activeTab === item.id;
                      return (
                        <div key={item.id}>
                          <button
                            onClick={() => {
                              setActiveTab(item.id);
                              if (item.subTabs && item.subTabs.length > 0) {
                                setActiveSubTab(item.subTabs[0].id);
                              }
                            }}
                            className={`group w-full text-left px-3 py-2.5 rounded-xl transition-all duration-200 relative border-l-2 ${
                              isActive
                                ? 'bg-blue-500/12 border-blue-500 text-slate-100 shadow-[0_0_12px_rgba(59,130,246,0.4)]'
                                : 'border-transparent text-slate-200 hover:bg-white/5 hover:translate-x-1'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <IconBadge icon={item.icon} active={isActive} />
                              <p className="font-medium">{item.label}</p>
                            </div>
                          </button>
                          {isActive && item.subTabs && item.subTabs.length > 0 && (
                            <div className="mt-1 ml-8 space-y-1">
                              {item.subTabs.map((subTab) => (
                                <button
                                  key={subTab.id}
                                  onClick={() => setActiveSubTab(subTab.id)}
                                  className={`w-full text-left px-2 py-1 rounded-md text-sm transition ${
                                    activeSubTab === subTab.id
                                      ? 'text-cyan-300'
                                      : 'text-slate-300 hover:text-slate-100'
                                  }`}
                                >
                                  • {subTab.label}
                                  {subTab.id === 'messages' && unreadMessageCount > 0 && (
                                    <span className="ml-2 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white bg-red-600 rounded-full">
                                      {unreadMessageCount}
                                    </span>
                                  )}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>
          <div className="p-6 border-t border-white/10 bg-transparent rounded-b-2xl">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProfileMenu((v) => !v)}
                className="flex items-center gap-3 w-full text-left"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#61dafb] to-[#4fa8c5] text-white flex items-center justify-center text-lg font-semibold border-2 border-white shadow">
                    {(user?.name || 'Admin').slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-300">Signed in</p>
                  <p className="text-base font-semibold text-white">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-300 mt-0.5">System Admin</p>
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-20">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      setNameInput(user?.name || '');
                      setAvatarFile(null);
                      setAvatarPreview(avatarUrl || '');
                      setProfileError('');
                      setShowEditModal(true);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                      navigate('/');
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-6 lg:ml-0 mt-20 lg:mt-0">
          {/* Desktop Header - Hidden on Mobile */}
          <header className="hidden lg:flex lg:flex-row lg:items-center lg:justify-between bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 p-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Welcome back</p>
              <h1 className="text-4xl font-extrabold leading-tight bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                Hi {user?.name || 'Admin'}, let's build.
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                aria-label="View messages"
                className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white"
                onClick={() => {
                  setActiveTab('myfan');
                  setActiveSubTab('messages');
                  setUnreadMessageCount(0);
                }}
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadMessageCount > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold leading-none text-white bg-red-600 rounded-full border border-white">{unreadMessageCount}</span>
                )}
              </button>
            </div>
          </header>

          <section className="bg-white/95 backdrop-blur-sm rounded-[20px] shadow-[0_20px_40px_rgba(15,23,42,0.12)] border border-white/70 p-6">
            {activeTab === 'headerpost' && (
              <>
                {activeSubTab === 'images' && <ImageManager />}
                {activeSubTab === 'videos' && <VideoManager />}
              </>
            )}
            {activeTab === 'homehero' && <HeroImageManager />}
            {activeTab === 'latest' && <LatestPostManager />}
            {activeTab === 'myfan' && (
              <>
                {activeSubTab === 'subscribers' && <SubscriberManager />}
                {activeSubTab === 'messages' && <ContactMessagesManager />}
              </>
            )}
            {activeTab === 'sponsors' && <SponsorContactManager />}
            {activeTab === 'admins' && <AdminManager />}
          </section>
        </main>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 relative">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              ✕
            </button>
            <h3 className="text-2xl font-semibold text-gray-900 mb-1">Edit Profile</h3>
            <p className="text-sm text-gray-600 mb-4">Update your display name and profile image.</p>

            {profileError && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {profileError}
              </div>
            )}

            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg font-semibold">
                    {(nameInput || user?.name || 'A').slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Profile image</p>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    setAvatarFile(file || null);
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setAvatarPreview(reader.result);
                      reader.readAsDataURL(file);
                    } else {
                      setAvatarPreview(avatarUrl || '');
                    }
                  }}
                  className="block w-full text-sm text-gray-700"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Display name</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#61dafb] focus:border-[#61dafb]"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setProfileError('');
                  setSavingProfile(true);
                  try {
                    const formData = new FormData();
                    if (nameInput) formData.append('name', nameInput);
                    if (avatarFile) formData.append('image', avatarFile);
                    const result = await updateProfile(formData);
                    if (!result.success) {
                      setProfileError(result.message);
                    } else {
                      setShowEditModal(false);
                    }
                  } catch (err) {
                    setProfileError('Unable to update profile.');
                  } finally {
                    setSavingProfile(false);
                  }
                }}
                disabled={savingProfile}
                className="px-4 py-2 rounded-lg bg-[#61dafb] text-white hover:bg-[#4fa8c5] transition disabled:opacity-60"
                type="button"
              >
                {savingProfile ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default AdminDashboard;

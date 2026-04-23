import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const YOUTUBE_SUBSCRIBE =
  'https://www.youtube.com/channel/UCNvHCa5hbWucXiYSuxFlqpw?sub_confirmation=1';

const IconHome = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const IconAbout = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const IconServices = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconContact = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconArrowCircle = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const navItems = [
  { to: '/', label: 'Home', Icon: IconHome, end: true },
  { to: '/about', label: 'About', Icon: IconAbout, end: false },
  { to: '/services', label: 'Services', Icon: IconServices, end: false },
  { to: '/contact', label: 'Contact', Icon: IconContact, end: false },
];

const NavComp = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (to, end) => {
    if (end) return location.pathname === '/';
    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  };

  const desktopLinkClass = (to, end) =>
    `inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
      isActive(to, end)
        ? 'bg-neutral-800 text-white'
        : 'text-white/90 hover:bg-neutral-800/70 hover:text-white'
    }`;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((v) => !v);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="w-full text-white z-[999] mb-0 transition-all duration-300 relative bg-black/60 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4 h-16">
          {/* Wordmark — yellow text in light border */}
          <Link
            to="/"
            className="shrink-0 rounded-lg border border-white/90 px-3 py-1.5 no-underline transition-opacity hover:opacity-90"
          >
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-400 bg-clip-text text-transparent">
              Fitsum Fiseha
            </span>
          </Link>

          {/* Center nav — md+ */}
          <ul className="hidden md:flex list-none m-0 p-0 items-center justify-center gap-0.5 sm:gap-1 flex-1 min-w-0 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {navItems.map(({ to, label, Icon, end }) => (
              <li key={to}>
                <Link to={to} className={`no-underline ${desktopLinkClass(to, end)}`}>
                  <Icon className="w-4 h-4 shrink-0 opacity-90" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right — admin + Follow Us (md+) */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3 shrink-0">
            {isAuthenticated && (
              <>
                <span className="text-white/60 text-xs max-w-[100px] truncate hidden xl:inline">
                  {user?.name}
                </span>
                <Link
                  to="/admin"
                  className="no-underline text-xs font-medium text-white/80 hover:text-white border border-white/30 rounded-full px-3 py-1.5 transition-colors hover:bg-neutral-800"
                >
                  Admin
                </Link>
              </>
            )}
            <a
              href={YOUTUBE_SUBSCRIBE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium px-4 py-2 no-underline transition-colors border border-neutral-600"
            >
              Follow Us
              <IconArrowCircle className="w-4 h-4" />
            </a>
          </div>

          {/* Small screens: Follow Us + hamburger */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            <a
              href={YOUTUBE_SUBSCRIBE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-neutral-800 text-white text-xs font-medium px-2.5 py-1.5 no-underline"
            >
              Follow Us
            </a>
            <button
              onClick={toggleMobileMenu}
              className="flex flex-col justify-center items-center w-9 h-9 gap-1.5 focus:outline-none focus:ring-2 focus:ring-white/30 rounded-md"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[998] md:hidden"
          onClick={closeMobileMenu}
          aria-hidden
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[min(100%,280px)] bg-neutral-950 border-l border-neutral-800 shadow-2xl z-[999] transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-neutral-800">
            <span className="text-sm font-semibold text-white">Menu</span>
            <button
              onClick={closeMobileMenu}
              className="w-9 h-9 flex items-center justify-center text-white/80 hover:text-white rounded-md"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <ul className="flex flex-col list-none m-0 p-0 flex-1 overflow-y-auto">
            {navItems.map(({ to, label, Icon, end }) => {
              const active = isActive(to, end);
              return (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 px-4 py-3.5 text-sm font-medium border-b border-neutral-800 no-underline ${
                      active ? 'bg-neutral-800 text-white' : 'text-white/85 hover:bg-neutral-900'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0 opacity-90" />
                    {label}
                  </Link>
                </li>
              );
            })}
            <li className="p-4 border-t border-neutral-800 mt-auto">
              <a
                href={YOUTUBE_SUBSCRIBE}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium py-3 no-underline border border-neutral-600"
              >
                Follow Us
                <IconArrowCircle className="w-4 h-4" />
              </a>
            </li>
            {isAuthenticated && (
              <>
                <li className="px-4 py-3 border-t border-neutral-800">
                  <p className="text-white/60 text-xs">Signed in as {user?.name}</p>
                </li>
                <li className="px-4 pb-4">
                  <Link
                    to="/admin"
                    onClick={closeMobileMenu}
                    className="block text-center rounded-full border border-white/30 text-white text-sm py-2.5 no-underline hover:bg-neutral-800"
                  >
                    Admin
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavComp;

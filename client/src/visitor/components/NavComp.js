import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import mahletImage from '../../assets/mahlet solom.jpg';

const NavComp = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      
      // Make nav sticky when user scrolls down past 150px
      // This accounts for banner and initial content
      if (scrollY > 150) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Spacer to prevent layout shift when nav becomes fixed */}
      {isScrolled && <div className="h-[60px] mb-4"></div>}
      <nav 
        ref={navRef}
        className={`w-full bg-white bg-opacity-95 backdrop-blur-md shadow-md z-[999] mb-4 transition-all duration-300 ${
          isScrolled ? 'fixed top-0 left-0 right-0' : 'relative'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-5 flex justify-between items-center h-[60px]">
          {/* Logo */}
          <div className="nav-logo flex items-center gap-3">
            <Link to="/" className="no-underline text-amber-400 flex items-center gap-3">
              <img
                src={mahletImage}
                alt="Mahlet Solomon"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#61dafb]"
              />
              <h2 className="m-0 text-amber-400 text-2xl hidden sm:block">Mahlet Solomon</h2>
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex list-none m-0 p-0 gap-8 items-center">
            <li><Link to="/" className="no-underline text-amber-400 font-medium transition-colors duration-300 hover:text-amber-500">Home</Link></li>
            <li><Link to="/about" className="no-underline text-amber-400 font-medium transition-colors duration-300 hover:text-amber-500">About</Link></li>
            <li><Link to="/services" className="no-underline text-amber-400 font-medium transition-colors duration-300 hover:text-amber-500">Services</Link></li>
            <li><Link to="/latest" className="no-underline text-amber-400 font-medium transition-colors duration-300 hover:text-amber-500">Latest</Link></li>
            <li><Link to="/contact" className="no-underline text-amber-400 font-medium transition-colors duration-300 hover:text-amber-500">Contact</Link></li>
            {isAuthenticated && (
              <>
                <li className="text-amber-400/90 text-sm flex items-center">
                  Welcome, {user?.name}
                </li>
                <li>
                  <Link to="/admin" className="no-underline bg-[#61dafb] text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-[#4fa8c5] hover:text-white">
                    Admin
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-amber-400 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-amber-400 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-amber-400 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[998] md:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-[999] transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img
                src={mahletImage}
                alt="Mahlet Solomon"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#61dafb]"
              />
              <h3 className="text-lg font-semibold text-amber-400">Mahlet Solomon</h3>
            </div>
            <button
              onClick={closeMobileMenu}
              className="w-8 h-8 flex items-center justify-center text-amber-400 hover:text-amber-500"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Items */}
          <ul className="flex flex-col list-none m-0 p-0 flex-1 overflow-y-auto">
            <li>
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="block px-5 py-4 text-amber-400 font-medium transition-colors duration-300 hover:bg-gray-100 hover:text-amber-500 border-b border-gray-100"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={closeMobileMenu}
                className="block px-5 py-4 text-amber-400 font-medium transition-colors duration-300 hover:bg-gray-100 hover:text-amber-500 border-b border-gray-100"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                onClick={closeMobileMenu}
                className="block px-5 py-4 text-amber-400 font-medium transition-colors duration-300 hover:bg-gray-100 hover:text-amber-500 border-b border-gray-100"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/latest"
                onClick={closeMobileMenu}
                className="block px-5 py-4 text-amber-400 font-medium transition-colors duration-300 hover:bg-gray-100 hover:text-amber-500 border-b border-gray-100"
              >
                Latest
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="block px-5 py-4 text-amber-400 font-medium transition-colors duration-300 hover:bg-gray-100 hover:text-amber-500 border-b border-gray-100"
              >
                Contact
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li className="px-5 py-4 border-b border-gray-100">
                  <p className="text-amber-400/90 text-sm">Welcome, {user?.name}</p>
                </li>
                <li>
                  <Link
                    to="/admin"
                    onClick={closeMobileMenu}
                    className="block px-5 py-4 bg-[#61dafb] text-white font-medium transition-colors duration-300 hover:bg-[#4fa8c5] mx-5 my-2 rounded"
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


import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white bg-opacity-90 backdrop-blur-sm border-t-2 border-gray-200 mt-16 relative z-10">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
                <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12">
                    {/* About Section */}
                    <div className="col-span-1">
                        <h4 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-black mb-1 sm:mb-2 md:mb-3 lg:mb-4">Fitsum Fiseha</h4>
                        <p className="text-black/80 text-[10px] sm:text-xs md:text-sm leading-relaxed mb-1 sm:mb-2 md:mb-3 lg:mb-4">
                            Actor • Performer • Creative Professional
                        </p>
                        <p className="text-black/80 text-[10px] sm:text-xs md:text-sm leading-relaxed">
                            Passionate about storytelling and bringing characters to life. Connect with me for collaborations, partnerships, and creative projects.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h4 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-black mb-1 sm:mb-2 md:mb-3 lg:mb-4">Quick Links</h4>
                        <ul className="space-y-0.5 sm:space-y-1 md:space-y-2">
                            <li>
                                <Link to="/" className="text-black/80 hover:text-black transition-colors duration-300 text-[10px] sm:text-xs md:text-sm">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-black/80 hover:text-black transition-colors duration-300 text-[10px] sm:text-xs md:text-sm">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-black/80 hover:text-black transition-colors duration-300 text-[10px] sm:text-xs md:text-sm">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link to="/latest" className="text-black/80 hover:text-black transition-colors duration-300 text-[10px] sm:text-xs md:text-sm">
                                    Latest
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-black/80 hover:text-black transition-colors duration-300 text-[10px] sm:text-xs md:text-sm">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div className="col-span-1">
                        <h4 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-black mb-1 sm:mb-2 md:mb-3 lg:mb-4">Connect</h4>
                        <ul className="space-y-1 sm:space-y-1.5 md:space-y-2 lg:space-y-3">
                            <li>
                                <a
                                    href="mailto:contact@fistumfiseha.com"
                                    className="text-black/80 hover:text-black transition-colors duration-300 flex items-center text-[10px] sm:text-xs md:text-sm"
                                >
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Email
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.instagram.com/fitsumfisehatrainer_/?hl=en"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-black/80 hover:text-black transition-colors duration-300 flex items-center text-[10px] sm:text-xs md:text-sm"
                                >
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.tiktok.com/@fitsumtrainer1/video/7538894922938600760"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-black/80 hover:text-black transition-colors duration-300 flex items-center text-[10px] sm:text-xs md:text-sm"
                                >
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://linkedin.com/in/mahletsolomon"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-black/80 hover:text-black transition-colors duration-300 flex items-center text-[10px] sm:text-xs md:text-sm"
                                >
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.facebook.com/fitsum.fiseha.9"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-black/80 hover:text-black transition-colors duration-300 flex items-center text-[10px] sm:text-xs md:text-sm"
                                >
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.youtube.com/channel/UCNvHCa5hbWucXiYSuxFlqpw"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-black/80 hover:text-black transition-colors duration-300 flex items-center text-[10px] sm:text-xs md:text-sm"
                                >
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                    YouTube
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Additional Info Section */}
                    <div className="col-span-1">
                        <h4 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-black mb-1 sm:mb-2 md:mb-3 lg:mb-4">Information</h4>
                        <ul className="space-y-0.5 sm:space-y-1 md:space-y-2 text-black/80 text-[10px] sm:text-xs md:text-sm">
                            <li>Addis Ababa, Ethiopia</li>
                            <li>Bole Brass Behind Yougo</li>
                            <li>City Church</li>
                            <li className="mt-1 sm:mt-2 md:mt-3 lg:mt-4">
                                <a href="tel:+251911261954" className="hover:text-black transition-colors duration-300">
                                    +251 911 261 954
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-6 md:pt-8 border-t border-gray-300">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-black/80 text-[10px] sm:text-xs md:text-sm">
                            © {currentYear} Fitsum Fiseha. All rights reserved.
                        </p>
                        <div className="flex gap-2 sm:gap-4 md:gap-6 mt-2 sm:mt-3 md:mt-4 md:mt-0">
                            <button type="button" className="text-black/80 hover:text-black text-[10px] sm:text-xs md:text-sm transition-colors duration-300 bg-transparent border-none cursor-pointer p-0">
                                Privacy Policy
                            </button>
                            <button type="button" className="text-black/80 hover:text-black text-[10px] sm:text-xs md:text-sm transition-colors duration-300 bg-transparent border-none cursor-pointer p-0">
                                Terms of Service
                            </button>
                        </div>
                    </div>

                    {/* Developer Credit */}
                    <div className="mt-3 sm:mt-4 md:mt-6 pt-3 sm:pt-4 md:pt-6 border-t border-gray-200">
                        <div className="text-center">
                            <p className="text-black/70 text-[9px] sm:text-[10px] md:text-xs mb-0.5 sm:mb-1">
                                Website developed by
                            </p>
                            <p className="text-black/80 text-[10px] sm:text-xs md:text-sm font-medium">
                                Lealem Meseret
                            </p>
                            <a
                                href="mailto:meseretlealem8@gmail.com"
                                className="text-black hover:text-black text-[9px] sm:text-[10px] md:text-xs transition-colors duration-300 inline-flex items-center mt-0.5 sm:mt-1"
                            >
                                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 mr-0.5 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                meseretlealem8@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


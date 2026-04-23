import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import fitsumPortrait from '../../assets/fitsumf.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const location = useLocation();

    const quickLinks = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
    ];

    const socials = [
        {
            label: 'Instagram',
            href: 'https://www.instagram.com/fitsumfisehatrainer_/?hl=en',
        },
        {
            label: 'TikTok',
            href: 'https://www.tiktok.com/@fitsumtrainer1/video/7538894922938600760',
        },
        {
            label: 'YouTube',
            href: 'https://www.youtube.com/channel/UCNvHCa5hbWucXiYSuxFlqpw',
        },
        {
            label: 'Facebook',
            href: 'https://www.facebook.com/fitsum.fiseha.9',
        },
    ];

    const iconInstagram = (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
    );

    const iconTikTok = (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
        </svg>
    );

    const iconYouTube = (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    );

    const heroIcons = [
        { href: socials[0].href, label: 'Instagram', icon: iconInstagram, className: 'text-pink-500 hover:text-pink-400' },
        { href: socials[1].href, label: 'TikTok', icon: iconTikTok, className: 'text-cyan-400 hover:text-cyan-300' },
        { href: socials[2].href, label: 'YouTube', icon: iconYouTube, className: 'text-red-500 hover:text-red-400' },
    ];

    const cardsGrid = (
        <>
            <div className="rounded-xl bg-neutral-900/90 border border-neutral-800 p-4 sm:p-5 shadow-inner">
                <h3 className="text-white font-bold text-base mb-3 sm:mb-4">Quick Links</h3>
                <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
                    {quickLinks.map(({ to, label }) => {
                        const active = location.pathname === to;
                        return (
                            <li key={to}>
                                <Link
                                    to={to}
                                    className={`transition-colors duration-200 hover:text-white ${active ? 'text-white underline underline-offset-4 decoration-white/60' : 'text-gray-400'
                                        }`}
                                >
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="rounded-xl bg-neutral-900/90 border border-neutral-800 p-4 sm:p-5 shadow-inner">
                <h3 className="text-white font-bold text-base mb-3 sm:mb-4">Socials</h3>
                <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
                    {socials.map(({ label, href }) => (
                        <li key={label}>
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );

    return (
        <footer className="bg-[#0d0d0d] text-gray-400 mt-16 relative z-10 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
                {/* Top centered social intro */}
                <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 space-y-2">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                        Follow Us On Social Media
                    </h2>
                    <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-400">
                        We aspire to be the place where new ideas flourish and help cultivate them in way the generation can benefit from them.
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-5">
                        {heroIcons.map(({ href, label, icon, className }) => (
                            <a
                                key={`top-${label}`}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className={`transition-colors duration-300 ${className}`}
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Mobile: portrait as background behind brand + cards below */}
                <div className="flex flex-col items-center text-center gap-10 lg:hidden">
                    <div
                        className="w-full max-w-xl relative overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-900 bg-cover bg-center bg-no-repeat shadow-xl min-h-[300px] sm:min-h-[340px]"
                        style={{ backgroundImage: `url(${fitsumPortrait})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/80" aria-hidden />
                        <div className="relative z-10 flex flex-col items-center text-center space-y-4 p-6 sm:p-8 h-full justify-center">
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-400 bg-clip-text text-transparent drop-shadow-lg">
                                Fitsum Fiseha
                            </h2>
                            <p className="text-sm sm:text-base leading-relaxed text-gray-200/90 max-w-md mx-auto drop-shadow-md">
                                Personal Development Trainer • Motivational Speaker • Competition Creator
                            </p>
                            <p className="text-sm sm:text-base leading-relaxed text-gray-200/85 max-w-md mx-auto drop-shadow-md">
                                Empowering individuals to unlock their full potential and achieve their dreams. Connect with me for training programs, motivational speaking engagements, sharing your story, and personal development opportunities.
                            </p>
                            <div className="flex items-center justify-center gap-6 sm:gap-8 pt-2">
                                {heroIcons.map(({ href, label, icon, className }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className={`transition-colors duration-300 drop-shadow-md ${className}`}
                                    >
                                        {icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-lg grid grid-cols-2 gap-3 sm:gap-4 text-left">
                        {cardsGrid}
                    </div>
                </div>

                {/* Desktop (lg+): original 3-column — text | portrait img | cards */}
                <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start lg:text-left">
                    <div className="lg:col-span-4 flex flex-col items-start text-left space-y-5">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-400 bg-clip-text text-transparent drop-shadow-sm">
                            Fitsum Fiseha
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed text-gray-400 max-w-md">
                            Personal Development Trainer • Motivational Speaker • Competition Creator
                        </p>
                        <p className="text-sm sm:text-base leading-relaxed text-gray-400 max-w-md">
                            Empowering individuals to unlock their full potential and achieve their dreams. Connect with me for training programs, motivational speaking engagements, sharing your story, and personal development opportunities.
                        </p>
                        <div className="flex items-center justify-start gap-6 sm:gap-8 pt-1">
                            {heroIcons.map(({ href, label, icon, className }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className={`transition-colors duration-300 ${className}`}
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-4 flex justify-center shrink-0">
                        <div className="relative w-full max-w-[260px]">
                            <img
                                src={fitsumPortrait}
                                alt="Fitsum Fiseha"
                                className="w-full h-auto max-h-[340px] object-cover rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10"
                            />
                        </div>
                    </div>
                    <div className="lg:col-span-4 grid grid-cols-2 gap-4 text-left self-stretch">
                        {cardsGrid}
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-neutral-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-4 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:justify-between sm:items-center sm:text-left">
                    <p className="text-gray-500 text-xs sm:text-sm">
                        © {currentYear} All Rights Reserved.
                    </p>
                    <div className="flex flex-row items-center justify-center gap-2">
                        <span className="text-gray-500 text-xs sm:text-sm">Built By</span>
                        <a
                            href="https://t.me/thebaseoftheworld"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open Telegram — Lealem Meseret (@thebaseoftheworld)"
                            aria-label="Open Telegram chat with Lealem Meseret"
                            className="inline-flex items-center rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-1.5 text-sm font-medium text-gray-200 hover:bg-neutral-800 hover:text-white transition-colors duration-200"
                        >
                            Lealem Meseret
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import React from 'react';
import heroPortrait from '../../assets/service.png';
import avatarOne from '../../assets/fitsum.png';
import avatarTwo from '../../assets/fitsum3.png';
import avatarThree from '../../assets/invite.png';
import avatarFour from '../../assets/invite1.png';
import avatarFive from '../../assets/niku-removebg-preview.png';

const Services = () => {
    const audienceAvatars = [avatarOne, avatarTwo, avatarThree, avatarFour, avatarFive];

    return (
        <div className="w-full">
            <section className="relative overflow-hidden bg-transparent">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_12%,rgba(245,185,7,0.24),transparent_38%),radial-gradient(circle_at_88%_42%,rgba(245,185,7,0.28),transparent_40%)]" />
                <div className="relative mx-auto grid max-w-7xl items-center gap-10 py-10 md:grid-cols-2 md:px-4 lg:px-8 lg:py-14">
                    <div className="max-w-xl space-y-5 text-slate-900">
                        <h1 className="text-4xl font-extrabold uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
                            <span className="text-amber-400">Unlock</span> Your
                            <br />
                            True <span className="text-amber-400">Potential</span>
                        </h1>

                        <p className="text-lg font-semibold text-slate-900">
                            Transform your mindset. Elevate your life. Inspire others.
                        </p>

                        <p className="max-w-lg text-base leading-relaxed text-slate-700">
                            Join a journey of growth with Fitsum Fiseha - personal development trainer, motivational
                            speaker, and creator of Ethiopia&apos;s first motivational speech competition.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-amber-300"
                            >
                                Explore Programs
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-amber-300">
                                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                                        <path d="M12 5l7 7-7 7-1.41-1.41L15.17 13H5v-2h10.17l-4.58-4.59L12 5z" />
                                    </svg>
                                </span>
                            </button>

                            <a
                                href="https://www.youtube.com/channel/UCNvHCa5hbWucXiYSuxFlqpw?sub_confirmation=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-amber-500 bg-transparent px-6 py-3 text-sm font-bold text-slate-900 transition hover:border-amber-600 hover:text-amber-700"
                            >
                                Watch Speeches
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-amber-300 text-amber-300">
                                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </span>
                            </a>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <div className="flex -space-x-3">
                                {audienceAvatars.map((avatar, index) => (
                                    <img
                                        key={index}
                                        src={avatar}
                                        alt="community member"
                                        className="h-10 w-10 rounded-full border-2 border-white object-cover"
                                    />
                                ))}
                            </div>
                            <div className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-amber-400 px-3 text-sm font-bold text-black">
                                100+
                            </div>
                            <p className="text-sm font-semibold text-slate-700">Lives Impacted Across Ethiopia</p>
                        </div>
                    </div>

                    <div className="relative flex justify-center md:justify-end">
                        <div className="pointer-events-none absolute inset-y-10 right-0 hidden w-1/2 rounded-full bg-amber-400/20 blur-3xl md:block" />
                        <img
                            src={heroPortrait}
                            alt="Fitsum Fiseha portrait"
                            className="relative z-10 max-h-[620px] w-full max-w-lg object-contain"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;


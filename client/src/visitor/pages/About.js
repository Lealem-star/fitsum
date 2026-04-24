import React from 'react';
import portraitPrimary from '../../assets/fitsum.png';
import portraitSecondary from '../../assets/service.png';
import portraitThird from '../../assets/hear.png';
import portraitFourth from '../../assets/speech.png';


// Animated Movie & Theatre Icons Component
const AnimatedIcon = ({ icon, className = '', delay = 0 }) => {
    const icons = {
        film: (
            <svg className="w-12 h-12 md:w-16 md:h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4zm-6.75 11.25L10 18l-1.25-2.75L6 14l2.75-1.25L10 10l1.25 2.75L14 14l-2.75 1.25zm5.69-3.31L16 14l-.94-2.06L13 11l2.06-.94L16 8l.94 2.06L19 11l-2.06.94z" />
            </svg>
        ),
        camera: (
            <svg className="w-12 h-12 md:w-16 md:h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 6h-3.17L16 4H8v2h7.12l1.83 2H21v12H3V6h18zm0 14V8H3v12h18zM8 14.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5z" />
            </svg>
        ),
        mask: (
            <svg className="w-12 h-12 md:w-16 md:h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9L7 12l2.5-2.5L12 11l2.5-1.5L17 12l1.31-4.9C19.37 8.45 20 10.15 20 12c0 4.41-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z" />
            </svg>
        ),
        clapperboard: (
            <svg className="w-12 h-12 md:w-16 md:h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.65 6.5l-2.74 3.54 2.74 3.54H19.5c-.28 0-.5.22-.5.5v7c0 .28.22.5.5.5h2c.28 0 .5-.22.5-.5v-11c0-.28-.22-.5-.5-.5h-1.85zM4.5 6.5H2.5c-.28 0-.5.22-.5.5v11c0 .28.22.5.5.5h2c.28 0 .5-.22.5-.5V7c0-.28-.22-.5-.5-.5zm13.5 0v3.54l-2.74-3.54H18zm-4 0v3.54l-2.74-3.54H14zm-4 0v3.54L7.26 6.5H10zm-4 0v3.54L3.26 6.5H6z" />
            </svg>
        ),
        spotlight: (
            <svg className="w-12 h-12 md:w-16 md:h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9L7 12l2.5-2.5L12 11l2.5-1.5L17 12l1.31-4.9C19.37 8.45 20 10.15 20 12c0 4.41-3.59 8-8 8z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        ),
        stage: (
            <svg className="w-12 h-12 md:w-16 md:h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM8 11h2v2H8v-2zm4 0h2v2h-2v-2zm-4 4h2v2H8v-2zm4 0h2v2h-2v-2z" />
            </svg>
        ),
    };

    return (
        <div
            className={`absolute text-black/30 ${className}`}
            style={{
                animation: `float 6s ease-in-out infinite`,
                animationDelay: `${delay}s`,
            }}
        >
            {icons[icon]}
        </div>
    );
};

// Helper function to extract YouTube video ID from URL
const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const About = () => {
    // Interview YouTube links
    const interviewVideos = [
        'https://youtu.be/qjGw1pYZflE?si=_jStiN7si5Ae0-zl',
        'https://youtu.be/Er2GZUuQ70U?si=YfyYlZ5CWjwR4VRS',
    ];

    return (
        <div className="w-full relative">
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.1); }
                }
            `}</style>

            <div className="text-center pt-8 pb-2">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Who am I ?</h1>
            </div>
            <div className="flex justify-center gap-6 pb-8">
                <a
                    href="https://www.instagram.com/fitsumfisehatrainer_/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white transition hover:scale-105 hover:border-white/40"
                >
                    <svg viewBox="0 0 24 24" className="h-2 w-2 fill-current">
                        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5z" />
                        <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zM17.5 6.2a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6z" />
                    </svg>
                </a>
                <a
                    href="https://www.tiktok.com/@fitsumtrainer1"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white transition hover:scale-105 hover:border-white/40"
                >
                    <svg viewBox="0 0 24 24" className="h-2 w-2 fill-current">
                        <path d="M14.2 3.4c.8 1.8 2.2 3 4.2 3.1v3a7.2 7.2 0 0 1-4.2-1.4v6.4a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v3.1a2.5 2.5 0 1 0 1.6 2.4V3.4h3.1z" />
                    </svg>
                </a>
                <a
                    href="https://www.youtube.com/channel/UCNvHCa5hbWucXiYSuxFlqpw"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white transition hover:scale-105 hover:border-white/40"
                >
                    <svg viewBox="0 0 24 24" className="h-2 w-2 fill-current">
                        <path d="M22 12c0-2.1-.2-3.6-.6-4.5a2.9 2.9 0 0 0-1.7-1.7C18.8 5.4 17.3 5.2 12 5.2s-6.8.2-7.7.6a2.9 2.9 0 0 0-1.7 1.7C2.2 8.4 2 9.9 2 12s.2 3.6.6 4.5a2.9 2.9 0 0 0 1.7 1.7c.9.4 2.4.6 7.7.6s6.8-.2 7.7-.6a2.9 2.9 0 0 0 1.7-1.7c.4-.9.6-2.4.6-4.5zM10 15.5v-7l6 3.5-6 3.5z" />
                    </svg>
                </a>
            </div>

            {/* Hero Image Section */}
            <section className="py-16 px-5 mx-4 mb-8 relative overflow-hidden">
                <AnimatedIcon icon="camera" className="top-4 left-4" delay={0} />
                <AnimatedIcon icon="film" className="top-4 right-4" delay={1} />
                <AnimatedIcon icon="mask" className="bottom-4 left-8" delay={2} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Left: Image */}
                        <div className="flex justify-center md:justify-start">
                            <div className="relative overflow-hidden w-full max-w-md">
                                <img
                                    src={portraitPrimary}
                                    alt="Fitsum Fiseha"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>

                        {/* Right: Text Content */}
                        <div className="space-y-6 text-black">
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-5xl font-bold mb-6">I'm Fitsum Fiseha</h1>
                                <p className="text-lg text-black leading-relaxed">
                                    I a personal development trainer, motivational speaker, and creator dedicated to helping people discover their strength, purpose, and potential. My mission is to inspire individuals to overcome self-doubt, build confidence, and take meaningful steps toward a better future.
                                </p>
                                <p className="text-lg text-black leading-relaxed">
                                    Through training programs, motivational speaking, and transformative initiatives, I create spaces where growth becomes possible and voices are empowered. I believe every person has unique value, hidden ability, and the power to create positive change when given the right guidance and opportunity.
                                </p>
                                <p className="text-lg text-black leading-relaxed">
                                    I am also the founder of አንቂ አንደበቶች, a platform created to inspire self-expression, confidence, and leadership through the art of speaking.
                                </p>
                                <p className="text-lg text-black leading-relaxed">
                                    My journey is built on one belief: when people change their mindset, they can change their lives.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Personal Development Training Section */}
            <section className="py-16 px-5 mx-4 mb-8 relative overflow-hidden">
                <AnimatedIcon icon="stage" className="top-8 left-8" delay={0.5} />
                <AnimatedIcon icon="spotlight" className="top-8 right-8" delay={1.5} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div className="space-y-6 text-black">
                            <div className="space-y-4">
                                <h1 className="text-2xl md:text-3xl font-bold mb-6">As a personal development trainer</h1>
                                <p className="text-lg text-black leading-relaxed">
                                I design comprehensive programs that help individuals unlock their potential, build confidence, and achieve their goals. My training approach combines proven methodologies with personalized coaching to create transformative experiences.
                                </p>
                                <p className="text-lg text-black leading-relaxed">
                                Through interactive workshops, I guide participants in developing essential life skills including goal setting, time management, emotional intelligence, and leadership capabilities. My philosophy centers on creating a supportive environment where growth is celebrated and every individual is empowered to reach their highest potential.
                                </p>
                                <p className="text-lg text-black leading-relaxed">
                                Whether working with individuals or groups, I focus on practical, actionable strategies that can be immediately applied to create positive change in both personal and professional lives.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-center md:justify-end">
                            <div className="relative overflow-hidden w-full max-w-md">
                                <img
                                    src={portraitThird}
                                    alt="Fitsum Fiseha personal development training"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Motivational Speaking Section */}
            <section className="py-16 px-5 mx-4 mb-8 relative overflow-hidden">
                <AnimatedIcon icon="camera" className="top-24 left-24" delay={2} />
                <AnimatedIcon icon="stage" className="bottom-24 right-24" delay={3.6} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-start mb-8">
                        <div className="flex justify-center md:justify-start">
                            <div className="relative overflow-hidden w-full max-w-md">
                                <img
                                    src={portraitSecondary}
                                    alt="Fitsum Fiseha motivational speaking"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                        <div className="space-y-6 text-black">
                            <div className="space-y-4">
                                <h1 className="text-2xl md:text-3xl font-bold mb-6">As a motivational speaker</h1>
                                <p className="text-lg text-black leading-relaxed">
                                    I deliver powerful messages that inspire, empower, and transform. Through dynamic presentations, I connect with audiences on a deep level, sharing insights and strategies that help individuals overcome obstacles, achieve their goals, and create lasting positive change in their lives.
                                </p>
                                <div className="flex flex-wrap items-center gap-4 pt-2">
                                    <a
                                        href="https://www.youtube.com/channel/UCNvHCa5hbWucXiYSuxFlqpw?sub_confirmation=1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-amber-300"
                                    >
                                        Watch Motivational Videos
                                    </a>
                                    <a
                                        href="https://www.youtube.com/channel/UCNvHCa5hbWucXiYSuxFlqpw?sub_confirmation=1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-amber-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-amber-50"
                                    >
                                        Hear Motivational Talks
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
       
                </div>
            </section>

                        {/* አንቂ አንደበቶች Competition Section */}
                        <section className="py-16 px-5 text-black mx-4 mb-6 relative overflow-hidden">
                <AnimatedIcon icon="spotlight" className="top-20 left-20" delay={1.6} />
                <AnimatedIcon icon="clapperboard" className="bottom-20 right-20" delay={3.2} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="relative overflow-hidden">
                            <img
                                src={portraitFourth}
                                alt="አንቂ አንደበቶች competition"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="space-y-4">
                        <h1 className="text-2xl md:text-3xl font-bold mb-6">As a founder of አንቂ አንደበቶች</h1>
                            <p className="text-lg text-black leading-relaxed">
                                I am the proud creator and organizer of "አንቂ አንደበቶች" (Anki Andebetoch), the first Ethiopian motivational speech competition. This groundbreaking initiative was born from my vision to create a platform where aspiring speakers can share their stories, inspire others, and develop their public speaking skills.
                            </p>
                            <p className="text-lg text-black leading-relaxed">
                                The competition provides participants with the opportunity to craft and deliver powerful motivational speeches that resonate with audiences. Through this platform, we celebrate the art of public speaking while fostering a culture of empowerment, self-expression, and personal growth across Ethiopia.
                            </p>
                            <p className="text-lg text-black leading-relaxed">
                                "አንቂ አንደበቶች" has become a transformative experience for countless participants, helping them build confidence, refine their communication skills, and connect with audiences in meaningful ways. This competition represents my commitment to empowering voices and creating opportunities for personal and professional development.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* add mission and vision section here */}
            <section className="py-16 px-5 mx-4 mb-6 relative overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-white">Our Mission</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                            <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-yellow-400">
                                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                                    <path d="M12 3c5 0 9 3.6 9 8 0 4.8-4.5 8.5-8.8 9.8a1 1 0 0 1-.4 0C7.5 19.5 3 15.8 3 11c0-4.4 4-8 9-8zm0 2c-3.9 0-7 2.7-7 6 0 3.5 3.3 6.4 7 7.7 3.7-1.3 7-4.2 7-7.7 0-3.3-3.1-6-7-6zm-1.2 3.8h2.4v2.4h-2.4V8.8zm0 3.6h2.4v2.8h-2.4v-2.8z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Create Space for Ideas</h3>
                            <p className="text-gray-300 text-base leading-relaxed">
                                To create a space where ideas flourish and meaningful discussions thrive.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                            <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-yellow-400">
                                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                                    <path d="M9 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm8 2a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM9 13c2.8 0 8 1.4 8 4v2H1v-2c0-2.6 5.2-4 8-4zm8 1c1.8 0 5 .9 5 2.7V19h-4v-2c0-1.1-.5-2.2-1.6-3 .6 0 1.1 0 1.6 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Diverse Voices</h3>
                            <p className="text-gray-300 text-base leading-relaxed">
                                To bring diverse voices and perspectives to the forefront.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                            <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-yellow-400">
                                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                                    <path d="M12 3a6 6 0 0 0-6 6v4a3 3 0 0 0 3 3h.3l1 4h3.4l1-4h.3a3 3 0 0 0 3-3V9a6 6 0 0 0-6-6zm-4 9V9a4 4 0 1 1 8 0v3h-1v-3a3 3 0 1 0-6 0v3H8z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Inspire Generation</h3>
                            <p className="text-gray-300 text-base leading-relaxed">
                                To entertain, educate, and inspire the new generation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* My Interviews Section */}
            <section className="py-16 px-5 text-black mx-4 mb-6 relative overflow-hidden">
                <AnimatedIcon icon="film" className="top-28 left-28" delay={2.4} />
                <AnimatedIcon icon="mask" className="bottom-28 right-28" delay={4} />
                <AnimatedIcon icon="spotlight" className="top-1/2 left-8" delay={1.8} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-white">My Interviews</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {interviewVideos.map((videoUrl, index) => {
                            const videoId = getYouTubeId(videoUrl);
                            if (!videoId) return null;
                            return (
                                <div key={index} className="relative overflow-hidden bg-black">
                                    <div className="relative w-full pb-[56.25%]">
                                        <iframe
                                            title={`Interview Video ${index + 1}`}
                                            src={`https://www.youtube.com/embed/${videoId}`}
                                            className="absolute inset-0 w-full h-full"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-10 flex justify-center">
                        <a
                            href="https://www.youtube.com/channel/UCNvHCa5hbWucXiYSuxFlqpw?sub_confirmation=1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-amber-300"
                        >
                            More Videos
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black text-amber-300">
                                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;

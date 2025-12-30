import React from 'react';
import portraitPrimary from '../../assets/fitsum.jpg';
import portraitSecondary from '../../assets/fitsum.jpg';

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

    // TV Show YouTube links
    const tvShowVideos = [
        'https://youtu.be/LbH-iVmfYvU?si=_044SVDRd6MVSLzx',
        'https://youtu.be/Nm5feveKsNo?si=KovFYG0LYu-SIyWm',
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

            {/* Hero Image Section */}
            <section className="py-16 px-5 bg-white/10 backdrop-blur-sm rounded-lg mx-4 mb-8 relative overflow-hidden border border-white/30">
                <AnimatedIcon icon="camera" className="top-4 left-4" delay={0} />
                <AnimatedIcon icon="film" className="top-4 right-4" delay={1} />
                <AnimatedIcon icon="mask" className="bottom-4 left-8" delay={2} />
                <div className="max-w-6xl mx-auto relative z--[10">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Left: Image */}
                        <div className="flex justify-center md:justify-start">
                            <div className="relative rounded-2xl overflow-hidden shadow-xl w-full max-w-md">
                                <img
                                    src={portraitPrimary}
                                    alt="Fitsum Fiseha"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>

                        {/* Right: Text Content */}
                        <div className="space-y-6 text-amber-400">
                            <div>
                                <p className="text-sm uppercase tracking-wider text-amber-400/70 mb-2">Personal Development Trainer & Motivational Speaker</p>
                                <h1 className="text-4xl md:text-5xl font-bold mb-6">Fitsum Fiseha</h1>
                                <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-amber-400/90">
                                    Empowering Lives Through Personal Development and Motivational Speaking
                                </h2>
                            </div>

                            <div className="space-y-4 text-lg leading-relaxed text-amber-400/90">
                                <p>
                                    As a personal development trainer and motivational speaker, I am dedicated to empowering individuals to unlock their full potential and achieve their dreams. My journey in personal development began with a deep passion for helping others overcome challenges, build confidence, and create meaningful change in their lives.
                                </p>

                                <p>
                                    Through transformative workshops, one-on-one coaching, and powerful motivational speeches, I guide people on their path to self-discovery and growth. My approach combines practical strategies with inspirational insights, creating an environment where transformation is not just possible—it's inevitable.
                                </p>

                                <p>
                                    I am the proud creator of "አንቂ አንደበቶች" (Anki Andebetoch), the first Ethiopian motivational speech competition. This groundbreaking initiative provides a platform for aspiring speakers to share their stories, inspire others, and develop their public speaking skills. Through this competition, I continue to foster a culture of empowerment and self-expression across Ethiopia.
                                </p>

                                <div className="pt-4 border-t border-amber-400/20">
                                    <p className="text-base font-semibold text-amber-400 mb-2">
                                        Explore my work in detail below
                                    </p>
                                    <p className="text-sm text-amber-400/70 italic">
                                        Learn more about my personal development training, motivational speaking, and the "አንቂ አንደበቶች" competition in the sections below.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Personal Development Training Section */}
            <section className="py-16 px-5 bg-white/10 backdrop-blur-sm rounded-lg mx-4 mb-6 relative overflow-hidden border border-white/30">
                <AnimatedIcon icon="stage" className="top-8 left-8" delay={0.5} />
                <AnimatedIcon icon="spotlight" className="top-8 right-8" delay={1.5} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <h2 className="text-4xl font-bold text-amber-400 mb-8 text-center">Personal Development Training</h2>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <p className="text-lg text-amber-400/90 leading-relaxed">
                                As a personal development trainer, I design comprehensive programs that help individuals unlock their potential, build confidence, and achieve their goals. My training approach combines proven methodologies with personalized coaching to create transformative experiences.
                            </p>
                            <p className="text-lg text-amber-400/90 leading-relaxed">
                                Through interactive workshops, I guide participants in developing essential life skills including goal setting, time management, emotional intelligence, and leadership capabilities. My philosophy centers on creating a supportive environment where growth is celebrated and every individual is empowered to reach their highest potential.
                            </p>
                            <p className="text-lg text-amber-400/90 leading-relaxed">
                                Whether working with individuals or groups, I focus on practical, actionable strategies that can be immediately applied to create positive change in both personal and professional lives.
                            </p>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src={portraitPrimary}
                                alt="Fitsum Fiseha personal development training"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* አንቂ አንደበቶች Competition Section */}
            <section className="py-16 px-5 bg-white/10 backdrop-blur-sm text-amber-400 rounded-lg mx-4 mb-6 relative overflow-hidden border border-white/30">
                <AnimatedIcon icon="spotlight" className="top-20 left-20" delay={1.6} />
                <AnimatedIcon icon="clapperboard" className="bottom-20 right-20" delay={3.2} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <h2 className="text-4xl font-bold mb-8 text-center">አንቂ አንደበቶች - The First Ethiopian Motivational Speech Competition</h2>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src={portraitSecondary}
                                alt="አንቂ አንደበቶች competition"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="space-y-4">
                            <p className="text-lg text-amber-400/90 leading-relaxed">
                                I am the proud creator and organizer of "አንቂ አንደበቶች" (Anki Andebetoch), the first Ethiopian motivational speech competition. This groundbreaking initiative was born from my vision to create a platform where aspiring speakers can share their stories, inspire others, and develop their public speaking skills.
                            </p>
                            <p className="text-lg text-amber-400/90 leading-relaxed">
                                The competition provides participants with the opportunity to craft and deliver powerful motivational speeches that resonate with audiences. Through this platform, we celebrate the art of public speaking while fostering a culture of empowerment, self-expression, and personal growth across Ethiopia.
                            </p>
                            <p className="text-lg text-amber-400/90 leading-relaxed">
                                "አንቂ አንደበቶች" has become a transformative experience for countless participants, helping them build confidence, refine their communication skills, and connect with audiences in meaningful ways. This competition represents my commitment to empowering voices and creating opportunities for personal and professional development.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Motivational Speaking Section */}
            <section className="py-16 px-5 bg-white/10 backdrop-blur-sm rounded-lg mx-4 mb-6 relative overflow-hidden border border-white/30">
                <AnimatedIcon icon="camera" className="top-24 left-24" delay={2} />
                <AnimatedIcon icon="stage" className="bottom-24 right-24" delay={3.6} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <h2 className="text-4xl font-bold text-amber-400 mb-8 text-center">Motivational Speaking</h2>
                    <div className="space-y-6 mb-8">
                        <p className="text-lg text-amber-400/90 leading-relaxed text-center max-w-3xl mx-auto">
                            As a motivational speaker, I deliver powerful messages that inspire, empower, and transform. Through dynamic presentations, I connect with audiences on a deep level, sharing insights and strategies that help individuals overcome obstacles, achieve their goals, and create lasting positive change in their lives.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {tvShowVideos.map((videoUrl, index) => {
                            const videoId = getYouTubeId(videoUrl);
                            if (!videoId) return null;
                            return (
                                <div key={index} className="relative rounded-xl overflow-hidden shadow-lg bg-black">
                                    <div className="relative w-full pb-[56.25%]">
                                        <iframe
                                            title={`Motivational Speech Video ${index + 1}`}
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
                </div>
            </section>

            {/* My Interviews Section */}
            <section className="py-16 px-5 bg-white/10 backdrop-blur-sm text-amber-400 rounded-lg mx-4 mb-6 relative overflow-hidden border border-white/30">
                <AnimatedIcon icon="film" className="top-28 left-28" delay={2.4} />
                <AnimatedIcon icon="mask" className="bottom-28 right-28" delay={4} />
                <AnimatedIcon icon="spotlight" className="top-1/2 left-8" delay={1.8} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <h2 className="text-4xl font-bold mb-8 text-center">My Interviews</h2>
                    <div className="space-y-6 mb-8">
                        <p className="text-lg text-amber-400/90 leading-relaxed text-center max-w-3xl mx-auto">
                            Conversations about personal development, motivation, and empowerment. These interviews explore
                            my journey as a trainer and motivational speaker, sharing insights on personal growth, the creation of "አንቂ አንደበቶች", and the stories behind inspiring transformation.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {interviewVideos.map((videoUrl, index) => {
                            const videoId = getYouTubeId(videoUrl);
                            if (!videoId) return null;
                            return (
                                <div key={index} className="relative rounded-xl overflow-hidden shadow-lg bg-black">
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
                </div>
            </section>
        </div>
    );
};

export default About;

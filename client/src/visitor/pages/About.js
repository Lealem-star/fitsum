import React from 'react';
import portraitPrimary from '../../assets/mahlet solom.jpg';
import portraitSecondary from '../../assets/mahletsolomon.jpg';

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
        'https://youtu.be/3e7F4sFfYZQ?si=2c1iIB5kP2fAfcCI',
        'https://youtu.be/wPUqRyC0zA8?si=OxdYuOPGag6_jXvG',
        'https://youtu.be/x0QFgCF5vRk?si=AlWE04UcXoEdQn9g',
        'https://youtu.be/M_gL_g-g-xc?si=cqJk3BO1pLvTij6f',
        'https://youtu.be/QFtlokfLF4I?si=SuLJdh4CCyCL22OX',
        'https://youtu.be/gTM93V9zy4U?si=p9lWnr5Avwq2ivM2',
        'https://youtu.be/3DsH_F4Bc2o?si=UH0phv3RmL8tzygB',
        'https://youtu.be/UukdqkYgfEk?si=grkJsTuBlJxzAyy0',
    ];

    // TV Show YouTube links
    const tvShowVideos = [
        'https://youtu.be/1Ruks-KMQyQ?si=s-vTTpL8lkfkY07y',
        'https://youtu.be/2dzimi3O8O0?si=EVptUzm-t0cFORB8',
        'https://youtu.be/l7NtGezEjdg?si=BkBaf22bmW_DqNs9',
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
                                    alt="Mahlet Solomon"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>

                        {/* Right: Text Content */}
                        <div className="space-y-6 text-amber-400">
                            <div>
                                <p className="text-sm uppercase tracking-wider text-amber-400/70 mb-2">Creative Professional</p>
                                <h1 className="text-4xl md:text-5xl font-bold mb-6">Mahlet Solomon</h1>
                                <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-amber-400/90">
                                    A Journey Through Teaching and Creative Expression
                                </h2>
                            </div>

                            <div className="space-y-4 text-lg leading-relaxed text-amber-400/90">
                                <p>
                                    My journey as a creative professional began in the classroom, where I discovered my passion for teaching and mentoring. As an educator, I design transformative workshops that blend craft, mindset, and on-camera readiness, fostering environments where students feel safe to experiment and grow. This foundation in teaching naturally expanded into acting and directing, where I bring layered characters to life with fearless vulnerability and lead collaborative teams with precise storytelling vision.
                                </p>

                                <p>
                                    Through research focused on narrative structures and character development, I explore how bold women's voices can shape storytelling across mediums. As a producer with over 50 projects to my name, I bring together diverse creative teams to realize bold visions, always maintaining artistic integrity and strategic planning.
                                </p>

                                <p>
                                    Today, I continue to embrace my multifaceted role as an educator, actor, director, and producer. My journey is a testament to the belief that storytelling is a powerful vehicle for connection and transformation. Join me as we explore the art of narrative and the stories that shape our world.
                                </p>

                                <div className="pt-4 border-t border-amber-400/20">
                                    <p className="text-base font-semibold text-amber-400 mb-2">
                                        Explore my work in detail below
                                    </p>
                                    <p className="text-sm text-amber-400/70 italic">
                                        Learn more about my teaching philosophy, research studies, acting and directing work, and producing experience in the sections below.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* My Teaching Section */}
            <section className="py-16 px-5 bg-white/10 backdrop-blur-sm rounded-lg mx-4 mb-6 relative overflow-hidden border border-white/30">
                <AnimatedIcon icon="stage" className="top-8 left-8" delay={0.5} />
                <AnimatedIcon icon="spotlight" className="top-8 right-8" delay={1.5} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <h2 className="text-4xl font-bold text-amber-400 mb-8 text-center">My Teaching</h2>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <p className="text-lg text-amber-400/90 leading-relaxed">
                                {/* Add your teaching description here */}
                                As an educator, I design workshops that blend craft, mindset, and on-camera readiness.
                                I coach actors to unlock presence, truth, and sustainable craft habits, creating spaces
                                where risk-taking is celebrated and growth is inevitable.
                            </p>
                            <p className="text-lg text-amber-400/90 leading-relaxed">
                                My teaching philosophy centers on ensemble-first leadership, building teams where actors
                                feel safe to experiment and crews move with clarity. Every lesson ladders up to real-world
                                application and audience impact.
                            </p>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src={portraitPrimary}
                                alt="Mahlet Solomon teaching"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* My Research Studies Section */}
            <section className="py-16 px-5 bg-white/10 backdrop-blur-sm text-amber-400 rounded-lg mx-4 mb-6 relative overflow-hidden border border-white/30">
                <AnimatedIcon icon="clapperboard" className="top-12 left-12" delay={0.8} />
                <AnimatedIcon icon="camera" className="bottom-12 right-12" delay={2.2} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <h2 className="text-4xl font-bold mb-8 text-center">My Academic Contributions to African Theatre Studies</h2>
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src={portraitSecondary}
                                alt="Mahlet Solomon research"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="space-y-4">
                            <p className="text-lg text-amber-400/90 leading-relaxed">
                                As a passionate advocate for the arts and an educator affiliated with Addis Ababa University, I have dedicated a significant part of my career to advancing the understanding of African theatre, particularly focusing on the experiences of women in this vibrant field. My contributions span both scholarly publications and practical applications in theatre, reflecting my belief in the power of storytelling to foster cultural dialogue.
                            </p>

                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold text-amber-400">Contributions to African Theatre 14: Contemporary Women</h3>
                                <p className="text-lg text-amber-400/90 leading-relaxed">
                                    One of my proudest achievements is my contribution to the edited volume African Theatre 14: Contemporary Women, published by James Currey in 2015/2016. In this work, I had the honor of co-authoring a chapter titled "Contemporary Ethiopian Actresses" alongside Jane Plastow. This chapter features interviews with six remarkable Ethiopian actresses, shedding light on their personal experiences and the evolution of contemporary professional theatre in Addis Ababa.
                                </p>
                                <p className="text-lg text-amber-400/90 leading-relaxed">
                                    Through these interviews, we aimed to highlight the vital contributions of women in African contemporary theatre, often overlooked by international media. It is crucial to acknowledge the unique challenges and triumphs these actresses face, as their stories enrich the cultural tapestry of Ethiopian theatre and underscore the importance of female voices in our artistic landscape.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold text-amber-400">Contribution to the Journal of African Cultural Studies</h3>
                                <p className="text-lg text-amber-400/90 leading-relaxed">
                                    In addition to my work in the anthology, I co-authored an article in the Journal of African Cultural Studies with my colleague Lealem Berhanu Terega. Our article, titled "Religious, Political and Cultural Influences on the First Ethiopian Playwright, Teklehawariat Teklemariam and His Play Fabula: Yawreoch Commedia," was published in Volume 26, Issue 3, in 2014.
                                </p>
                                <p className="text-lg text-amber-400/90 leading-relaxed">
                                    This article delves into the biography of Teklehawariat Teklemariam, the first Amharic-language playwright, and analyzes his groundbreaking play to reveal the socio-cultural identity that shaped his work. By examining the European and Ethiopian cultural elements that merged to create a new hybrid theatre form, we contribute to a deeper understanding of the formation and characteristics of Ethiopian theatre.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold text-amber-400">Other Work and Initiatives</h3>
                                <p className="text-lg text-amber-400/90 leading-relaxed">
                                    Beyond my academic contributions, I remain actively engaged in the Ethiopian arts scene as a theatre and film director, scriptwriter, actress, and producer. I am committed to using applied theatre as a tool for peacebuilding and social cohesion through my organization, Mahlet Solomon Theatre Production (MSTP). This initiative allows me to explore the transformative power of theatre in fostering dialogue and understanding within communities.
                                </p>
                                <p className="text-lg text-amber-400/90 leading-relaxed">
                                    Through my work in both academia and the arts, I strive to elevate the voices of women and promote the rich cultural heritage of Ethiopia. I believe that storytelling is not just an art form; it is a means of connection, healing, and empowerment.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* My Acting & Directing Section */}
            <section className="py-16 px-5 bg-white/10 backdrop-blur-sm rounded-lg mx-4 mb-6 relative overflow-hidden border border-white/30">
                <AnimatedIcon icon="mask" className="top-16 left-16" delay={1.2} />
                <AnimatedIcon icon="film" className="top-16 right-16" delay={2.8} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <h2 className="text-4xl font-bold text-amber-400 mb-8 text-center">My Acting & Directing</h2>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <p className="text-lg text-amber-400/90 leading-relaxed">
                                {/* Add your acting & directing description here */}
                                As an actor, I bring layered characters to life on stage and screen with fearless vulnerability.
                                As a director, I lead casts and crews with a collaborative vision and precise storytelling instincts.
                            </p>
                            <p className="text-lg text-amber-400/90 leading-relaxed">
                                From intimate drama to bold televised formats, I move fluidly between performance and leadership,
                                shaping narratives that center truth, audacity, and emotional precision. Every story choice
                                ladders up to an audience moment they remember.
                            </p>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src={portraitPrimary}
                                alt="Mahlet Solomon acting and directing"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* My Producing Section */}
            <section className="py-16 px-5 bg-white/10 backdrop-blur-sm text-amber-400 rounded-lg mx-4 mb-6 relative overflow-hidden border border-white/30">
                <AnimatedIcon icon="spotlight" className="top-20 left-20" delay={1.6} />
                <AnimatedIcon icon="clapperboard" className="bottom-20 right-20" delay={3.2} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <h2 className="text-4xl font-bold mb-8 text-center">My Producing</h2>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src={portraitSecondary}
                                alt="Mahlet Solomon producing"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="space-y-4">
                            <p className="text-lg text-amber-400/90 leading-relaxed">
                                {/* Add your producing description here */}
                                As a producer, I build projects end-to-end, from financing to festival-ready finishes.
                                I thrive on collaboration, bringing together creative teams and resources to bring bold
                                visions to life.
                            </p>
                            <p className="text-lg text-amber-400/90 leading-relaxed">
                                My producing approach combines strategic planning with creative flexibility, ensuring that
                                every project maintains its artistic integrity while meeting production goals. I've led
                                over 50 productions, each one a testament to the power of collaborative storytelling.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* My TV Show & Judge Section */}
            <section className="py-16 px-5 bg-white/10 backdrop-blur-sm rounded-lg mx-4 mb-6 relative overflow-hidden border border-white/30">
                <AnimatedIcon icon="camera" className="top-24 left-24" delay={2} />
                <AnimatedIcon icon="stage" className="bottom-24 right-24" delay={3.6} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <h2 className="text-4xl font-bold text-amber-400 mb-8 text-center">My TV Show & Judge</h2>
                    <div className="space-y-6 mb-8">
                        <p className="text-lg text-amber-400/90 leading-relaxed text-center max-w-3xl mx-auto">
                            I created and own a TV format dedicated to rising actors. As the resident judge, I design
                            challenges that fuse craft with spontaneity, give actionable notes, and elevate standout
                            performers to their next break.
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
                                            title={`TV Show Video ${index + 1}`}
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
                            Conversations about craft, collaboration, and the creative process. These interviews explore
                            my journey as a multidisciplinary artist and the stories behind the work.
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

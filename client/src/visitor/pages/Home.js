import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';
import { getImageUrl } from '../../utils/imageUrl';
import mahletImage from '../../assets/fitsumf.png';
import nikuLogo from '../../assets/niku-removebg-preview.png';
import fitsum3Image from '../../assets/fitsum3.png';
import beAGuestImage from '../../assets/invite.png';
import SponsorModal from '../components/SponsorModal';

const Home = () => {
  const navigate = useNavigate();
  // Hero carousel state
  const [heroImages, setHeroImages] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [showSponsorModal, setShowSponsorModal] = useState(false);
  const [sponsorLoading, setSponsorLoading] = useState(false);
  const [sponsorSuccess, setSponsorSuccess] = useState('');
  const [sponsorError, setSponsorError] = useState('');
  const [youtubePosts, setYoutubePosts] = useState([]);
  const [youtubeLoading, setYoutubeLoading] = useState(true);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [sponsorForm, setSponsorForm] = useState({
    name: '',
    organization: '',
    phone: '',
    email: '',
    website: '',
  });

  // Fetch hero images
  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const response = await api.get('/api/home-hero/images');
        if (response.data && response.data.length > 0) {
          const imageUrls = response.data
            .filter(img => img.isActive !== false)
            .map(img => getImageUrl(img.imageUrl));
          setHeroImages(imageUrls);
        } else {
          // Fallback to default image if no images from API
          setHeroImages([mahletImage]);
        }
      } catch (error) {
        console.error('Error fetching hero images:', error);
        // Fallback to default image on error
        setHeroImages([mahletImage]);
      }
    };

    fetchHeroImages();
  }, []);

  useEffect(() => {
    const fetchYoutubePosts = async () => {
      try {
        setYoutubeLoading(true);
        const res = await api.get('/api/latest-posts');
        const data = Array.isArray(res.data) ? res.data : [];
        const youtubeOnly = data.filter((p) => p?.type === 'youtube' && p?.mediaUrl);
        const sorted = [...youtubeOnly].sort((a, b) => {
          const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bDate - aDate;
        });
        setYoutubePosts(sorted.slice(0, 20));
      } catch (error) {
        console.error('Error fetching YouTube posts:', error);
        setYoutubePosts([]);
      } finally {
        setYoutubeLoading(false);
      }
    };

    fetchYoutubePosts();
  }, []);

  const getYouTubeEmbedUrl = (mediaUrl) => {
    if (!mediaUrl) return '';
    const isFullUrl = mediaUrl.includes('youtube.com') || mediaUrl.includes('youtu.be');
    const videoId = isFullUrl
      ? mediaUrl
        .replace(/.*v=/, '')
        .replace(/.*be\//, '')
        .split(/[?&]/)[0]
      : mediaUrl;
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const testimonials = [
    {
      name: 'Sophia',
      role: 'Listener',
      text: 'Your message has become a part of my routine. Keep the episodes coming!',
    },
    {
      name: 'John',
      role: 'Listener',
      text: 'The discussions are always insightful and engaging. Keep up the great work!',
    },
    {
      name: 'Sarah Alemu',
      role: 'Listener',
      text: 'This platform inspires me to think differently and embrace new ideas.',
    },
    {
      name: 'Daniel',
      role: 'Listener',
      text: 'Every episode leaves me with something practical to apply right away.',
    },
    {
      name: 'Marta',
      role: 'Listener',
      text: 'I love how real and relatable the conversations are. Thank you!',
    },
  ];

  const goToPrevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Auto-rotate hero images every 3 seconds
  useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const goToPrevHero = () => {
    setCurrentHeroIndex((prevIndex) =>
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  const goToNextHero = () => {
    setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  const heroCtas = [
    {
      label: 'Join My Mailing',
      action: () => window.dispatchEvent(new Event('open-email-capture')),
    },
    {
      label: 'Be My Guest',
      action: () => navigate('/contact'),
    },
    {
      label: 'Be Sponsor',
      action: () => setShowSponsorModal(true),
    },
    {
      label: 'Watch on YouTube',
      action: () =>
        window.open(
          'https://www.youtube.com/channel/UCNvHCa5hbWucXiYSuxFlqpw?sub_confirmation=1',
          '_blank',
          'noopener,noreferrer'
        ),
    },
  ];

  const openSponsorModal = () => {
    setShowSponsorModal(true);
    setSponsorSuccess('');
    setSponsorError('');
  };

  const closeSponsorModal = () => {
    setShowSponsorModal(false);
    setSponsorLoading(false);
    setSponsorError('');
    setSponsorSuccess('');
  };

  const handleSponsorChange = (e) => {
    const { name, value } = e.target;
    setSponsorForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSponsorSubmit = async (e) => {
    e.preventDefault();
    setSponsorError('');
    setSponsorSuccess('');
    setSponsorLoading(true);

    try {
      const emailForSubmit =
        sponsorForm.email?.trim() || `sponsor-${Date.now()}@placeholder.local`;
      const notes = [
        `Organization: ${sponsorForm.organization}`,
        `Phone: ${sponsorForm.phone}`,
        sponsorForm.website ? `Website: ${sponsorForm.website}` : null,
      ]
        .filter(Boolean)
        .join('\n');

      await api.post('/api/subscribers/subscribe', {
        name: sponsorForm.name,
        email: emailForSubmit,
        source: 'partner',
        notes,
      });

      setSponsorSuccess('Thanks! Your sponsorship interest has been submitted.');
      setSponsorForm({
        name: '',
        organization: '',
        phone: '',
        email: '',
        website: '',
      });
      setTimeout(() => setShowSponsorModal(false), 1200);
    } catch (error) {
      setSponsorError(
        error.response?.data?.message || 'Failed to submit sponsorship request. Please try again.'
      );
    } finally {
      setSponsorLoading(false);
    }
  };

  return (
    <div className="w-full">



      {/* Hero Section - Auto-rotating Image Carousel */}
      <section id="home" className="relative w-full h-[620px] md:h-[700px] mb-6 overflow-hidden">
        {heroImages.length > 0 ? (
          <>
            <div className="relative w-full h-full">
              {heroImages.map((imageUrl, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentHeroIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                  <img
                    src={imageUrl}
                    alt={`Hero ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/65" />
                </div>
              ))}
            </div>

            <div className="absolute inset-0 z-20">
              <div className="max-w-7xl h-full mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                <div className="hidden md:flex h-full items-end justify-start pt-20">
                  <img
                    src={heroImages[currentHeroIndex]}
                    alt="Featured visual"
                    className="h-[88%] w-auto max-w-none object-contain object-bottom drop-shadow-2xl"
                  />
                </div>

                <div className="relative h-full flex flex-col justify-center text-center md:text-left pb-20 md:pb-12">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[70%] h-[80%] hidden md:block pointer-events-none">
                    <img
                      src={heroImages[currentHeroIndex]}
                      alt=""
                      className="w-full h-full object-contain opacity-20"
                    />
                  </div>

                  <div className="relative z-10 animate-hero-intro" key={`hero-intro-${currentHeroIndex}`}>
                    <h1
                      className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-[0.95]"
                      style={{ animationDelay: '0ms' }}
                    >
                      Fitsum Fiseha
                    </h1>
                    <p
                      className="text-base md:text-lg text-white/90 mb-8 max-w-xl leading-relaxed"
                      style={{ animationDelay: '120ms' }}
                    >
                      Personal Development Trainer | Motivational Speaker | Competition Creator
                    </p>
                    <button
                      onClick={() => {
                        heroCtas[currentHeroIndex % heroCtas.length].action();
                      }}
                      className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white font-semibold text-base rounded-full border border-white/20 hover:bg-zinc-800 transition-colors duration-300"
                      style={{ animationDelay: '220ms' }}
                    >
                      {heroCtas[currentHeroIndex % heroCtas.length].label}
                      <span className="text-lg">›</span>
                    </button>
                  </div>

                </div>
              </div>
            </div>

            <button
              onClick={goToPrevHero}
              aria-label="Previous slide"
              className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/45 hover:bg-black/65 border border-white/15 text-pink-500 text-2xl flex items-center justify-center transition-colors"
            >
              ‹
            </button>
            <button
              onClick={goToNextHero}
              aria-label="Next slide"
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/45 hover:bg-black/65 border border-white/15 text-pink-500 text-2xl flex items-center justify-center transition-colors"
            >
              ›
            </button>

            {heroImages.length > 1 && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentHeroIndex(index)}
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 border border-pink-500/80 ${index === currentHeroIndex
                      ? 'bg-pink-500'
                      : 'bg-transparent hover:bg-pink-500/50'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center">
            <div className="text-amber-400 text-xl">Loading...</div>
          </div>
        )}
      </section>



      {/* about section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 mb-10">
        <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-black">
              <p className="mt-2 text-gray-400/70">...</p>
              <span className="block">
                <span className="text-white">Who is Fitsum Fiseha?</span>
              </span>
              <p className="mt-2 text-gray-400/70">...</p>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="flex justify-center lg:justify-start">
              <img
                src={fitsum3Image}
                alt="Fitsum Fiseha"
                className="w-full max-w-[520px] h-auto object-contain"
              />
            </div>
            <div className="text-center lg:text-left">
              <p className="text-base sm:text-lg leading-relaxed text-black whitespace-pre-line">
                I help individuals overcome self-doubt, build confidence, and achieve meaningful growth.
                Through training, speaking, and competitions, I create platforms where transformation happens.
              </p>
              <button
                type="button"
                onClick={() => navigate('/about')}
                className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-white text-sm sm:text-base font-semibold hover:bg-zinc-800 transition-colors"
              >
                More About Me
                <span className="text-lg">›</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* about anki andebetoch section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto p-0">
          <div className="text-center mb-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-black">
              <p className="mt-2 text-gray-400/70">...</p>
              <span className="block">
                <span className="text-white">ANKI ANDEBETOCH</span>
              </span>
              <span className="block">
                <span className="text-yellow-500">አንቂ አንደበቶች</span>
              </span>
              <p className="mt-2 text-gray-400/70">...</p>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-5 text-center lg:text-left">
              <p className="text-lg sm:text-xl font-bold text-black">
                WHERE STORIES IGNITE CHANGE!
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-black">
                A powerful Ethiopian motivational series that brings real-life experiences to the spotlight -- where voices rise, emotions flow, and inspiration takes center stage. Through heartfelt storytelling and meaningful competition, individuals share their journeys of struggle, resilience, and transformation, leaving both judges and audiences deeply moved.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-black">
                From overcoming life's toughest challenges to celebrating personal growth, Anki Andebetoch delivers authentic stories that connect, uplift, and inspire a new generation to believe in their own path.
              </p>

              {/* Guest collection */}
              <div className="flex items-center justify-center lg:justify-start pt-1">
                <div className="flex items-center">
                  {[...Array(7)].map((_, index) => (
                    <img
                      key={index}
                      src={index % 2 === 0 ? nikuLogo : mahletImage}
                      alt={`Guest ${index + 1}`}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-yellow-400/90 -ml-2 first:ml-0"
                    />
                  ))}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-yellow-400/90 bg-black text-white text-[10px] sm:text-xs font-bold flex items-center justify-center -ml-2">
                    80+
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
                <button
                  type="button"
                  onClick={openSponsorModal}
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-black text-white text-xs sm:text-base font-semibold hover:bg-zinc-800 transition-colors whitespace-nowrap"
                >
                  BECOME A SPONSOR
                  <span className="w-6 h-6 rounded-full bg-zinc-700 inline-flex items-center justify-center text-sm">
                    →
                  </span>
                </button>
                <a
                  href="https://www.youtube.com/channel/UCNvHCa5hbWucXiYSuxFlqpw?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 sm:px-8 py-2.5 sm:py-3 rounded-full bg-yellow-400 text-black text-xs sm:text-base font-bold hover:bg-yellow-300 transition-colors whitespace-nowrap"
                >
                  WATCH ANKI ANDEBETOCH
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src={nikuLogo}
                alt="Niku logo"
                className="w-full max-w-[430px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* statics */}
      <section className="w-full px-4 sm:px-6 lg:px-8 mb-10">
        <div className="max-w-7xl mx-auto rounded-2xl bg-transparent p-2 sm:p-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 sm:gap-3">
            <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 min-h-[140px] sm:min-h-[160px] flex-1 basis-0 flex flex-col items-center justify-center text-center px-4">
              <p className="text-4xl sm:text-5xl font-extrabold text-white">250M+</p>
              <p className="mt-2 text-sm sm:text-base font-bold tracking-wide text-gray-400 uppercase">Lives Impacted</p>
            </div>

            <span className="md:hidden w-28 h-[2px] mx-auto bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
            <span className="hidden md:block w-[6px] h-20 bg-gradient-to-b from-transparent via-yellow-400 to-transparent" />

            <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 min-h-[140px] sm:min-h-[160px] flex-1 basis-0 flex flex-col items-center justify-center text-center px-4">
              <p className="text-4xl sm:text-5xl font-extrabold text-white">3+</p>
              <p className="mt-2 text-sm sm:text-base font-bold tracking-wide text-gray-400 uppercase">Round Conducted</p>
            </div>

            <span className="md:hidden w-28 h-[2px] mx-auto bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
            <span className="hidden md:block w-[6px] h-20 bg-gradient-to-b from-transparent via-yellow-400 to-transparent" />

            <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 min-h-[140px] sm:min-h-[160px] flex-1 basis-0 flex flex-col items-center justify-center text-center px-4">
              <p className="text-4xl sm:text-5xl font-extrabold text-white">250+</p>
              <p className="mt-2 text-sm sm:text-base font-bold tracking-wide text-gray-400 uppercase">ANDEBETOCH</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
          <p className="mt-2 text-gray-400/70">...</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white">Testimonials</h2>
            <p className="mt-2 text-sm sm:text-base text-gray-400">What Our Listeners Say About Us</p>
            <p className="mt-2 text-gray-400/70">...</p>
          </div>

          <div className="relative">
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-5xl h-[220px] sm:h-[240px]">
                {[-1, 0, 1].map((offset) => {
                  const idx = (testimonialIndex + offset + testimonials.length) % testimonials.length;
                  const t = testimonials[idx];
                  const isCenter = offset === 0;
                  const xPercent = offset === 0 ? 0 : offset === -1 ? -70 : 70;

                  return (
                    <div
                      key={`${idx}-${offset}`}
                      className={`absolute left-1/2 top-1/2 w-[92%] sm:w-[520px] transition-all duration-500 ${
                        isCenter ? 'z-20 opacity-100 scale-100' : 'z-10 opacity-35 scale-95'
                      }`}
                      style={{
                        transform: `translate(-50%, -50%) translateX(${xPercent}%)`,
                      }}
                    >
                      <div
                        className={`rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl px-6 sm:px-8 py-7 ${
                          isCenter ? 'bg-[#20216b]' : 'bg-white/5'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white font-bold">
                            {(t.name || 'T')[0]}
                          </div>
                          <div className="min-w-0">
                            <p className="text-white font-semibold leading-tight">{t.name}</p>
                            <p className="text-xs sm:text-sm text-gray-400">{t.role}</p>
                          </div>
                        </div>
                        <p className="mt-4 text-sm sm:text-base text-gray-200/90 leading-relaxed">{t.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={goToPrevTestimonial}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-white/15 bg-black/30 hover:bg-black/45 text-white flex items-center justify-center transition-colors"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={goToNextTestimonial}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-white/15 bg-black/30 hover:bg-black/45 text-white flex items-center justify-center transition-colors"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </section>
      

      {/* let's add videos section here */}
      <section className="w-full px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p className="mt-2 text-gray-400/70">...</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white">Videos</h2>
            <p className="mt-2 text-sm sm:text-base text-gray-400">
              Explore our latest videos and subscribe to our channel for more content.
            </p>
            <p className="mt-2 text-gray-400/70">...</p>
          </div>

          {youtubeLoading ? (
            <div className="text-center text-amber-400/90 py-10">Loading videos...</div>
          ) : youtubePosts.length === 0 ? (
            <div className="text-center text-gray-400 py-10">No videos yet.</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {youtubePosts.map((post) => {
                  const embedUrl = getYouTubeEmbedUrl(post.mediaUrl);
                  return (
                    <div
                      key={post.id || post._id}
                      className="overflow-hidden rounded-xl border border-white/10 bg-black/30"
                    >
                      <div className="relative w-full pb-[56.25%]">
                        <iframe
                          title={post.title || 'YouTube video'}
                          src={embedUrl}
                          className="absolute inset-0 w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                      {post.title && (
                        <div className="p-4">
                          <p className="text-sm sm:text-base font-semibold text-gray-200 line-clamp-2">
                            {post.title}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div className="mt-8 flex justify-center">
            <a
              href="https://www.youtube.com/channel/UCNvHCa5hbWucXiYSuxFlqpw?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-yellow-400 text-black text-sm sm:text-base font-bold hover:bg-yellow-300 transition-colors"
            >
              More
            </a>
          </div>
        </div>
      </section>

      {/* let's add sponsor section here */}
      <section className="w-full px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto rounded-2xl py-10 sm:py-12 px-4 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
            <span className="text-yellow-400">Become a Sponsor</span> and grow with Wechew Good!
          </h2>
          <p className="mt-5 max-w-3xl mx-auto text-base sm:text-lg text-gray-300 leading-relaxed">
            Partner with Ethiopia&apos;s most vibrant podcast to reach a passionate, engaged audience.
            Let&apos;s create impact together.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={openSponsorModal}
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-5 py-3 text-sm sm:text-base font-bold text-black transition hover:bg-yellow-300"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M20 7h-2.2a3 3 0 0 0 .2-1c0-1.7-1.3-3-3-3-1.8 0-2.8 1.4-3.5 2.8C10.8 4.4 9.8 3 8 3 6.3 3 5 4.3 5 6c0 .4.1.7.2 1H3a1 1 0 0 0-1 1v3c0 .6.4 1 1 1h1v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zM15 5c.6 0 1 .4 1 1s-.4 1-1 1h-2V6c.5-.7 1-1 2-1zM8 5c1 0 1.5.3 2 1v1H8a1 1 0 0 1 0-2zm-3 4h14v2H5V9zm1 4h5v6H6v-6zm7 0h5v6h-5v-6z" />
              </svg>
              Contact for Sponsorship
            </button>
            <a
              href="https://www.youtube.com/channel/UCNvHCa5hbWucXiYSuxFlqpw?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm sm:text-base font-semibold text-white transition hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M22 12c0-2.1-.2-3.6-.6-4.5a2.9 2.9 0 0 0-1.7-1.7C18.8 5.4 17.3 5.2 12 5.2s-6.8.2-7.7.6a2.9 2.9 0 0 0-1.7 1.7C2.2 8.4 2 9.9 2 12s.2 3.6.6 4.5a2.9 2.9 0 0 0 1.7 1.7c.9.4 2.4.6 7.7.6s6.8-.2 7.7-.6a2.9 2.9 0 0 0 1.7-1.7c.4-.9.6-2.4.6-4.5zM10 15.5v-7l6 3.5-6 3.5z" />
              </svg>
              See Our Channel
            </a>
          </div>
        </div>
      </section>





      {/* lets add a section for be a guest on the podcast */}

      <section className="w-full mb-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            <div className="flex justify-center lg:justify-end">
                <img
                  src={beAGuestImage}
                  alt="Be our guest"
                  className="w-full max-w-[420px] sm:max-w-[480px] h-auto object-contain drop-shadow-2xl"
                />
              </div>

              <div className="text-center lg:text-left">
                <p className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-black-400 uppercase">
                  Guest invitation
                </p>
                <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05]">
                  Be Our Guest
                </h2>
                <p className="mt-5 text-sm sm:text-base text-black-300/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Do you have an inspiring story, a unique experience, or an idea worth sharing?
                  We’d love to feature you on the podcast.
                </p>

                <div className="mt-8 flex items-center justify-center lg:justify-start">
                  <button
                    type="button"
                    onClick={() => navigate('/contact')}
                    className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>



            </div>
          </div>
        </div>
      </section>



      {/* subscribe and contact section */}

      <SponsorModal
        isOpen={showSponsorModal}
        onClose={closeSponsorModal}
        onSubmit={handleSponsorSubmit}
        sponsorError={sponsorError}
        sponsorSuccess={sponsorSuccess}
        sponsorForm={sponsorForm}
        onSponsorChange={handleSponsorChange}
        sponsorLoading={sponsorLoading}
      />

    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import { getImageUrl } from '../../utils/imageUrl';
import mahletImage from '../../assets/fitsumf.png';
import nikuLogo from '../../assets/niku.jpg';

const Home = () => {
  // Hero carousel state
  const [heroImages, setHeroImages] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

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
                  <div className="relative z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-[0.95]">
                      Fitsum Fiseha
                    </h1>
                    <p className="text-base md:text-lg text-white/90 mb-8 max-w-xl leading-relaxed">
                      Personal Development Trainer | Motivational Speaker | Competition Creator
                    </p>
                    <button
                      onClick={() => {
                        window.dispatchEvent(new Event('open-email-capture'));
                      }}
                      className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white font-semibold text-base rounded-full border border-white/20 hover:bg-zinc-800 transition-colors duration-300"
                    >
                      Join My Mailing
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

      {/* after hero section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-5 text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-black">
                <span className="block">
                  <span className="text-white">ANKI ANDEBETOCH</span>
                </span>
                <span className="block">
                  <span className="text-yellow-500">አንቂ አንደበቶች</span>
                </span>
              </h2>
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
                  SUBSCRIBE
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
              <p className="text-4xl sm:text-5xl font-extrabold text-white">310K+</p>
              <p className="mt-2 text-sm sm:text-base font-bold tracking-wide text-gray-400 uppercase">Subscribers</p>
            </div>

            <span className="md:hidden w-28 h-[2px] mx-auto bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
            <span className="hidden md:block w-[6px] h-20 bg-gradient-to-b from-transparent via-yellow-400 to-transparent" />

            <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 min-h-[140px] sm:min-h-[160px] flex-1 basis-0 flex flex-col items-center justify-center text-center px-4">
              <p className="text-4xl sm:text-5xl font-extrabold text-white">27M+</p>
              <p className="mt-2 text-sm sm:text-base font-bold tracking-wide text-gray-400 uppercase">Views</p>
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

      {/* subscribe and contact section */}

    </div>
  );
};

export default Home;

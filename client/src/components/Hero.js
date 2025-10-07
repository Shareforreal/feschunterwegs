import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAnimationConfig, isMobile } from '../utils/performance';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  
  // Get optimized animation config
  const animationConfig = getAnimationConfig();
  const mobile = isMobile();
  
  const heroImages = React.useMemo(() => [
    { src: "/images/Feschunterwegs_Lifestyle_Wochenendtrip_2 Frauen am Steg.webp", caption: "Südtirol" },
    { src: "/images/Blyb_Zeitunglesen im Bett.jpg", caption: "Blyb Hotel" },
    { src: "/images/Prati_Palai_Weinernte.jpg", caption: "Prati Palai" },
    { src: "/images/@richardgiori-@crema_video7-scaled.jpg", caption: "Gardasee" },
    { src: "/images/Blaue Gans_Hauptspeise mit Parmesanreibe.jpg", caption: "Blaue Gans" },
    { src: "/images/Schloss-Freudenstein_Hochzeitsgesellschaft.jpg", caption: "Schloss Freudenstein" },
    { src: "/images/Blaue Gans_Loveletter.jpg", caption: "Blaue Gans" },
    { src: "/images/Blyb_Barkeeper macht Cocktail.jpg", caption: "Blyb Hotel" },
    { src: "/images/Blyb_Sauna im Wald.jpg", caption: "Blyb Hotel" },
    { src: "/images/Prati_Palai_Pool.jpg", caption: "Prati Palai" },
    { src: "/images/Schloss-Freudenstein_Gesichtsmassage.jpg", caption: "Schloss Freudenstein" },
    { src: "/images/Rosso_Umgebung_Springende-Ziegen-auf-der-gruenen-Wiese.jpg", caption: "Rosso" },
    { src: "/images/Rosso_Gedeckter-Balkontisch-mit-Limonade.jpg", caption: "Rosso" }
  ], []);

  // Preload next image for smoother transitions
  const [preloadedImages, setPreloadedImages] = useState(new Set());
  
  useEffect(() => {
    // Only preload the next 2 images for smoother transitions
    const preloadNextImages = () => {
      const nextIndex = (currentImageIndex + 1) % heroImages.length;
      const nextNextIndex = (currentImageIndex + 2) % heroImages.length;
      
      [nextIndex, nextNextIndex].forEach(index => {
        if (!preloadedImages.has(heroImages[index].src)) {
          const img = new Image();
          img.onload = () => {
            setPreloadedImages(prev => new Set([...prev, heroImages[index].src]));
          };
          img.src = heroImages[index].src;
        }
      });
    };
    
    preloadNextImages();
  }, [currentImageIndex, heroImages, preloadedImages]);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length, isPaused]);

  // Check if we're online (8am - midnight)
  useEffect(() => {
    const checkOnlineStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      setIsOnline(hour >= 8 && hour < 24);
    };

    checkOnlineStatus();
    const interval = setInterval(checkOnlineStatus, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <section 
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Full-Screen Image Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${heroImages[currentImageIndex].src}')`
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationConfig.duration, ease: animationConfig.ease }}
          />
        </AnimatePresence>
      </div>
      
      
      {/* Subtle Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Text Content - Responsive Optimized */}
      <div className="absolute inset-0 flex items-start sm:items-center justify-center z-10">
        <div className="text-center max-w-4xl mx-3 sm:mx-6 px-3 sm:px-0 pt-20 sm:pt-0 md:pt-8">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: mobile ? 10 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animationConfig.duration, delay: mobile ? 0.1 : 0.2 }}
          >
            <div className="mb-8">
              <img 
                src="/images/Branding/Feschunterwegs_Logo_Coral.png" 
                alt="Feschunterwegs" 
                className="h-12 mx-auto drop-shadow-lg"
              />
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-hero mb-4 sm:mb-6 text-white drop-shadow-lg px-2"
            initial={{ opacity: 0, y: mobile ? 15 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animationConfig.duration, delay: mobile ? 0.15 : 0.3 }}
          >
            Die Momente, in denen alles perfekt ist.
          </motion.h1>
          
          <motion.p 
            className="text-body text-white/90 mb-4 sm:mb-8 max-w-2xl mx-auto drop-shadow-lg px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Dein kompletter Wochenendtrip ab München – in 4 Fragen maßgeschneidert für dich
          </motion.p>
          
          
          {/* Single Primary CTA */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex flex-col items-center gap-4">
              <button 
                className="bg-gradient-to-r from-coral-500 to-coral-400 text-white font-bold text-lg sm:text-xl px-8 sm:px-16 py-4 sm:py-6 rounded-2xl hover:from-coral-600 hover:to-coral-500 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 min-h-[56px] sm:min-h-[64px]"
                onClick={() => {
                  document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Jetzt Quiz starten
              </button>
              
              <button 
                className="text-white/80 hover:text-white underline hover:no-underline transition-all duration-300 text-sm sm:text-base flex items-center gap-2"
                onClick={() => {
                  document.getElementById('experiences').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Herbstangebote sichern</span>
                <span className="text-sm">→</span>
              </button>
            </div>
            
          </motion.div>
          
          
        </div>
      </div>
      
      {/* WhatsApp Chat - Bottom Right */}
      <motion.div
        className="absolute bottom-40 right-3 sm:bottom-24 sm:right-6 md:bottom-28 md:right-8 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <a 
          href="https://wa.me/498912255844" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-sage-500/90 backdrop-blur-sm border border-sage-400 text-white rounded-full hover:bg-sage-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.214-.361a9.86 9.86 0 01-1.378-5.031c0-5.449 4.436-9.884 9.884-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.449-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </a>
      </motion.div>

      {/* Carousel Navigation Dots - ABOVE trust badges */}
      <div className="absolute bottom-24 sm:bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentImageIndex === index 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Trust Badges at Bottom - MOBILE: stacked, DESKTOP: horizontal */}
      <div className="absolute bottom-8 sm:bottom-4 md:bottom-6 left-0 right-0 flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-4 md:gap-6 text-xs text-white/60 z-20 px-4">
        <div className="flex items-center gap-1">
          <span className="text-coral-300">✓</span>
          <span>Angesagte Hotels</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-coral-300">✓</span>
          <span>Insider-Aktivitäten</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-coral-300">✓</span>
          <span>Auto & Zug only</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="w-px h-16 bg-white/30 relative">
          <motion.div 
            className="w-px h-8 bg-white absolute top-0"
            animate={{ y: [0, 32, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
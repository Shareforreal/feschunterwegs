import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const heroImages = [
    "/images/de_durger_Ein-glueckliches-Paar-auf-der-Wiese-vor-dem-Hotel.jpeg",
    "/images/Blyb_Zeitunglesen im Bett.jpg",
    "/images/Prati_Palai_Weinernte.jpg",
    "/images/@richardgiori-@crema_video7-scaled.jpg",
    "/images/Blaue Gans_Hauptspeise mit Parmesanreibe.jpg",
    "/images/Schloss-Freudenstein_Hochzeitsgesellschaft.jpg",
    "/images/Blaue Gans_Loveletter.jpg",
    "/images/Blyb_Barkeeper macht Cocktail.jpg",
    "/images/Blyb_Sauna im Wald.jpg",
    "/images/Prati_Palai_Pool.jpg",
    "/images/Schloss-Freudenstein_Gesichtsmassage.jpg",
    "/images/Rosso_Umgebung_Springende-Ziegen-auf-der-gruenen-Wiese.jpg",
    "/images/Rosso_Gedeckter-Balkontisch-mit-Limonade.jpg"
  ];

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length, isPaused]);

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
              backgroundImage: `url('${heroImages[currentImageIndex]}')`
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>
      
      {/* Lighter Overlay for Better Image Visibility */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Text Content - Smaller, More Compact */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center max-w-3xl mx-4 sm:mx-6">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-6">
              <img 
                src="/images/Branding/Feschunterwegs_Logo_Coral.png" 
                alt="Feschunterwegs" 
                className="h-12 mx-auto drop-shadow-lg"
              />
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-hero mb-6 text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Diese Momente, wenn alles perfekt ist.
          </motion.h1>
          
          <motion.p 
            className="text-body text-white/90 mb-12 max-w-2xl mx-auto drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ihr wisst schon – diese Augenblicke, in denen ihr einfach nur da seid. Nur ihr und das Gefühl: Das ist es. Genau so soll sich Leben anfühlen.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <button 
              className="bg-gradient-to-r from-coral-500 to-coral-600 text-white font-semibold text-lg px-12 py-5 rounded-lg hover:from-coral-600 hover:to-coral-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              onClick={() => {
                document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Auszeit nehmen
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Carousel Navigation Dots */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentImageIndex === index 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
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
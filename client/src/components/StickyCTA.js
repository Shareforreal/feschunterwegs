import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

const StickyCTA = () => {
  const [showSticky, setShowSticky] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after user scrolls past hero section
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      
      if (scrollPosition > heroHeight * 0.8 && !isDismissed) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setShowSticky(false);
  };

  const scrollToQuiz = () => {
    document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {showSticky && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40"
        >
          {/* Mobile: Full-width bar */}
          <div className="block sm:hidden">
            <div className="bg-sage-500 text-white px-4 py-3 flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-semibold">Quiz starten (2 min) ✨</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={scrollToQuiz}
                  className="bg-white text-sage-600 px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2"
                >
                  <span>Los geht's</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDismiss}
                  className="text-white/70 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop: Card-style */}
          <div className="hidden sm:block">
            <div className="max-w-md mx-auto mb-6">
              <div className="bg-sage-50 rounded-lg shadow-2xl border border-sage-200 p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0 text-center">
                    <p className="text-sm font-semibold text-gray-900">
                      Dein Traumtrip in 2 Min ✨
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      onClick={scrollToQuiz}
                      className="btn-sage px-4 py-2 text-sm flex items-center space-x-2"
                    >
                      <span>Quiz starten</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={handleDismiss}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;

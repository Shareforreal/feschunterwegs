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
          className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-40 max-w-md w-full mx-4"
        >
          <div className="bg-sage-50 rounded-lg shadow-2xl border border-sage-200 p-3 sm:p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  Deine perfekten Trips warten
                </p>
                <p className="text-xs text-gray-600 hidden sm:block">
                  Nur 3 Minuten bis zu deinen Geheimtipps
                </p>
              </div>
              
              <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                <button
                  onClick={scrollToQuiz}
                  className="btn-sage px-2 sm:px-4 py-2 text-xs sm:text-sm flex items-center space-x-1 whitespace-nowrap"
                >
                  <span className="hidden sm:inline">Quiz starten</span>
                  <span className="sm:hidden">Start</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                
                <button
                  onClick={handleDismiss}
                  className="text-gray-400 hover:text-gray-600 p-1 flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Gift } from 'lucide-react';
import axios from 'axios';

const StickyCTA = () => {
  const [showSticky, setShowSticky] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Check if banner was already dismissed in this session
    const wasDismissed = sessionStorage.getItem('notificationBannerDismissed');
    if (wasDismissed) {
      return;
    }

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
    sessionStorage.setItem('notificationBannerDismissed', 'true');
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !firstName) return;
    
    setIsSubmitting(true);
    
    try {
      await axios.post('/api/exit-intent', {
        email,
        firstName
      });
      
      setIsSubscribed(true);
      setTimeout(() => {
        handleDismiss();
      }, 2000);
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Es gab einen Fehler beim Abonnieren. Bitte versuchen Sie es erneut.');
      setIsSubmitting(false);
    }
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
          {/* Mobile: White Glass Morphism */}
          <div className="block sm:hidden">
            <div className="backdrop-blur-md bg-white/80 border border-white/30 text-gray-800 px-4 py-4 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-coral-500/20 rounded-full backdrop-blur-sm">
                    <Gift className="w-5 h-5 text-coral-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Fesche Deals. Limitierte Plätze.</p>
                    <p className="text-xs text-gray-600">Nur für Abonnenten.</p>
                  </div>
                </div>
                <button
                  onClick={handleDismiss}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {isSubscribed ? (
                <div className="text-center py-2">
                  <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-4 py-2 backdrop-blur-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-sm font-medium text-green-700">Du bist dabei!</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe}>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Dein Name"
                      className="w-[35%] px-3 py-2 rounded-lg bg-white/70 backdrop-blur-sm text-gray-900 text-sm placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coral-500"
                      required
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Deine E-Mail"
                      className="w-[65%] px-3 py-2 rounded-lg bg-white/70 backdrop-blur-sm text-gray-900 text-sm placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coral-500"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting || !email || !firstName}
                      className="bg-coral-500 text-white px-3 py-2 rounded-lg text-sm font-semibold disabled:opacity-50 flex items-center justify-center hover:bg-coral-600 transition-all duration-200"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Desktop: White Glass Morphism */}
          <div className="hidden sm:block">
            <div className="max-w-4xl mx-auto mb-6">
              <div className="backdrop-blur-md bg-white/80 border border-white/30 rounded-2xl shadow-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="p-3 bg-coral-500/20 rounded-full backdrop-blur-sm">
                      <Gift className="w-6 h-6 text-coral-600" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-800">
                        Fesche Deals. Limitierte Plätze.
                      </p>
                      <p className="text-sm text-gray-600">
                        Nur für Abonnenten.
                      </p>
                    </div>
                  </div>
                  
                  {isSubscribed ? (
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-4 py-2 backdrop-blur-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <p className="text-green-700 font-semibold">Du bist dabei!</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="flex items-center gap-3 flex-1 max-w-md">
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Dein Name"
                        className="w-[35%] px-4 py-3 rounded-lg bg-white/70 backdrop-blur-sm text-gray-900 text-sm placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coral-500"
                        required
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Deine E-Mail-Adresse"
                        className="w-[65%] px-4 py-3 rounded-lg bg-white/70 backdrop-blur-sm text-gray-900 text-sm placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coral-500"
                        required
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting || !email || !firstName}
                        className="bg-coral-500 text-white px-4 py-3 rounded-lg font-semibold disabled:opacity-50 flex items-center hover:bg-coral-600 transition-all duration-200"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  )}
                  
                  <button
                    onClick={handleDismiss}
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors ml-4"
                  >
                    <X className="w-5 h-5" />
                  </button>
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

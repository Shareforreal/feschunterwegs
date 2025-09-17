import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Gift } from 'lucide-react';

const ExitIntentPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Disabled auto-trigger for now
  // useEffect(() => {
  //   const handleMouseLeave = (e) => {
  //     if (e.clientY <= 0) {
  //       setShowPopup(true);
  //     }
  //   };
  //   const timer = setTimeout(() => {
  //     document.addEventListener('mouseleave', handleMouseLeave);
  //   }, 10000);
  //   return () => {
  //     clearTimeout(timer);
  //     document.removeEventListener('mouseleave', handleMouseLeave);
  //   };
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Here you would typically send to your email list
    console.log('Exit intent email:', email);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowPopup(false);
      alert('Danke! Wir schicken dir deine 3 perfekten Trips in 2 Minuten.');
    }, 1000);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPopup(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-coral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-coral-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Warte! 🎁
              </h3>
              <p className="text-gray-600">
                Bevor du gehst – lass uns dir deine 3 perfekten Trips schicken. 
                <strong className="text-coral-600"> Kostenlos.</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Deine E-Mail-Adresse"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full btn-primary py-3 disabled:opacity-50"
              >
                {isSubmitting ? 'Wird gesendet...' : 'Jetzt Trips erhalten'}
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                Kein Spam. Nur die besten Geheimtipps.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;

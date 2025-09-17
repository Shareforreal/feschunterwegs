import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const SocialProof = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const reviews = [
    {
      id: 1,
      text: "Endlich jemand, der versteht, was ich suche, ohne dass ich es selbst weiß. Die Empfehlung war so spot-on, dass ich schon den nächsten Trip gebucht habe.",
      author: "Sarah M.",
      location: "München",
      date: "September 2025",
      rating: 5
    },
    {
      id: 2,
      text: "Das kleine Hotel am See war genau der Geheimtipp, den ich bei meinen Freunden gebraucht habe. Jetzt fragen alle, wo ich das gefunden habe.",
      author: "Thomas K.",
      location: "München", 
      date: "August 2025",
      rating: 5
    },
    {
      id: 3,
      text: "Wir waren skeptisch – warum sollte jemand anders wissen, was uns gefällt? Aber sie hatten recht. Komplett.",
      author: "Lisa & Marco",
      location: "München",
      date: "September 2025",
      rating: 5
    },
    {
      id: 4,
      text: "Als gebürtiger Münchner dachte ich, ich kenne jeden Winkel im Umland. Escape hat mir gezeigt, wie wenig ich wirklich wusste. Mind blown.",
      author: "Andreas S.",
      location: "München",
      date: "August 2025",
      rating: 5
    },
    {
      id: 5,
      text: "Die Zeit und Mühe, die ihr in die Auswahl steckt, merkt man sofort. Jeder Vorschlag war ein Volltreffer.",
      author: "Julia W.",
      location: "München",
      date: "August 2025",
      rating: 5
    },
    {
      id: 6,
      text: "Endlich jemand, der versteht, was wir suchen. Keine Massenabfertigung, sondern echte Geheimtipps!",
      author: "Michael R.",
      location: "München",
      date: "17. Juli 2025",
      rating: 5
    },
    {
      id: 7,
      text: "Das Wochenende war perfekt geplant. Von der Anreise bis zum Check-out – alles stimmte. Danke!",
      author: "Anna & Felix",
      location: "München",
      date: "12. Juli 2025",
      rating: 5
    },
    {
      id: 8,
      text: "Ich bin normalerweise sehr wählerisch, aber hier war wirklich jeder Tipp goldrichtig. Weiter so!",
      author: "Claudia H.",
      location: "München",
      date: "28. Juni 2025",
      rating: 5
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(reviews.length / 4));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(reviews.length / 4)) % Math.ceil(reviews.length / 4));
  }, []);

  // Auto-rotate every 8 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-warm-gray-300'
        }`}
      />
    ));
  };

  const ReviewCard = ({ review, index }) => {
    return (
      <motion.div
        className="bg-white rounded-2xl p-6 h-full flex flex-col shadow-lg border border-warm-200"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        {/* Stars */}
        <div className="flex items-center mb-4">
          {renderStars(review.rating)}
        </div>
        
        {/* Review Text */}
        <blockquote className="text-body mb-6 flex-grow leading-relaxed">
          „{review.text}"
        </blockquote>
        
        {/* Author & Date */}
        <div className="mt-auto pt-4 border-t border-warm-100">
          <div className="font-semibold text-editorial-900 mb-1">
            {review.author}
          </div>
          <div className="text-sm text-editorial-500">
            {review.location} • {review.date}
          </div>
        </div>
      </motion.div>
    );
  };

  const getCurrentReviews = () => {
    const startIndex = currentSlide * 4;
    return reviews.slice(startIndex, startIndex + 4);
  };

  const totalSlides = Math.ceil(reviews.length / 4);

  return (
    <section className="section-padding bg-warm-50 border-b border-warm-200">
      <div className="container-editorial">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="section-badge mb-6">
            <div className="section-badge-dot"></div>
            <p className="text-caption">Unsere Wirkung</p>
          </div>
          <h2 className="text-section mb-6 text-editorial-900">
            Was passiert, wenn ihr uns vertraut.
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Echte Erfahrungen von Menschen, die ihre Zeit nicht mit endlosem Suchen verschwenden wollten.
          </p>
        </motion.div>
        
        {/* Review Cards Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              {getCurrentReviews().map((review, index) => (
                <ReviewCard key={review.id} review={review} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Arrows */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevSlide}
              className="p-4 rounded-lg bg-sage-100 shadow-lg hover:shadow-xl transition-all"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-5 h-5 text-editorial-600" />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {Array.from({ length: totalSlides }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-coral-500' : 'bg-sage-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="p-4 rounded-lg bg-sage-100 shadow-lg hover:shadow-xl transition-all"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-5 h-5 text-editorial-600" />
            </button>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default SocialProof;

// Performance utilities for mobile optimization

// Detect if user is on mobile device
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
         window.innerWidth <= 768;
};

// Reduce motion for users who prefer it
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Optimize animations based on device capabilities
export const getAnimationConfig = () => {
  const mobile = isMobile();
  const reducedMotion = prefersReducedMotion();
  
  if (reducedMotion) {
    return {
      duration: 0.1,
      ease: "linear"
    };
  }
  
  if (mobile) {
    return {
      duration: 0.3,
      ease: "easeOut"
    };
  }
  
  return {
    duration: 0.6,
    ease: "easeInOut"
  };
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };
  
  return new IntersectionObserver(callback, defaultOptions);
};

// Debounce function for performance
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

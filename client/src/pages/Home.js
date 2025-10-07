import React, { Suspense, lazy } from 'react';
import Hero from '../components/Hero';

// Lazy load heavy components for better performance
const ProblemSolution = lazy(() => import('../components/ProblemSolution'));
const ExperiencesShowcase = lazy(() => import('../components/ExperiencesShowcase'));
const SocialProof = lazy(() => import('../components/SocialProof'));
const HowItWorks = lazy(() => import('../components/HowItWorks'));
const Quiz = lazy(() => import('../components/Quiz'));
const Footer = lazy(() => import('../components/Footer'));
const StickyCTA = lazy(() => import('../components/StickyCTA'));

// Loading component for lazy loaded sections
const SectionLoader = () => (
  <div className="py-16 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-coral-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Home = () => {
  return (
    <div>
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <Quiz />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ProblemSolution />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ExperiencesShowcase />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <HowItWorks />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <SocialProof />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <StickyCTA />
      </Suspense>
    </div>
  );
};

export default Home;

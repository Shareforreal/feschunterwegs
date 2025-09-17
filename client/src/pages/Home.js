import React from 'react';
import Hero from '../components/Hero';
import ProblemSolution from '../components/ProblemSolution';
import ExperiencesShowcase from '../components/ExperiencesShowcase';
import SocialProof from '../components/SocialProof';
import HowItWorks from '../components/HowItWorks';
import Quiz from '../components/Quiz';
import Footer from '../components/Footer';
import ExitIntentPopup from '../components/ExitIntentPopup';
import StickyCTA from '../components/StickyCTA';

const Home = () => {
  return (
    <div>
      <Hero />
      <Quiz />
      <ProblemSolution />
      <ExperiencesShowcase />
      <HowItWorks />
      <SocialProof />
      <Footer />
      <ExitIntentPopup />
      <StickyCTA />
    </div>
  );
};

export default Home;

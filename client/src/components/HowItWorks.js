import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Calendar } from 'lucide-react';

const steps = [
  {
    icon: CheckCircle,
    title: "Kurzes Quiz",
    description: "Was ist euch wichtig? Welche Stimmung sucht ihr? Wie viel Zeit habt ihr?"
  },
  {
    icon: Calendar,
    title: "Eure perfekte Auswahl",
    description: "Wir schicken euch handverlesene Trips, die wirklich zu eurem Lifestyle passen."
  },
  {
    icon: ArrowRight,
    title: "Einfach buchen",
    description: "Keine weiteren Recherchen nötig. Einfach fahren und genießen."
  }
];

const StepCard = ({ step, index }) => {
  const Icon = step.icon;
  
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="w-8 h-8 text-sage-600" />
      </div>
      <h3 className="text-xl font-semibold mb-4 text-editorial-900">
        {step.title}
      </h3>
      <p className="text-body max-w-sm mx-auto">
        {step.description}
      </p>
    </motion.div>
  );
};

const HowItWorks = () => {
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
            <p className="text-caption">Unser Prozess</p>
          </div>
          <h2 className="text-section mb-8 text-editorial-900">
            Drei Schritte zum perfekten Moment.
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default HowItWorks;

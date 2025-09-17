import React from 'react';
import { motion } from 'framer-motion';

const ProblemSolution = () => {
  return (
    <section className="section-padding bg-warm-50 border-b border-warm-200">
      <div className="container-editorial text-center">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="section-badge mb-6">
            <div className="section-badge-dot"></div>
            <p className="text-caption">Unser Versprechen</p>
          </div>
        </motion.div>
        
        <motion.h2 
          className="text-section mb-12 text-editorial-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Wir sind fesch unterwegs
        </motion.h2>
        
        <motion.div 
          className="text-body max-w-3xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>
          Wir sind die Münchner, die jeden versteckten Spot im Umkreis von 400km persönlich getestet haben. Die wissen, welches Hotel wirklich den besten Sonnenuntergang hat und welcher Wirt euch das Gefühl gibt, nach Hause zu kommen. Wir bringen euch zu den Orten, von denen alle reden werden – nur halt erst später.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolution;

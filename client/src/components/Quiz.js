import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Mail } from 'lucide-react';
import axios from 'axios';

const questions = [
  {
    id: 'trip_type',
    question: 'Was ist das Wichtigste für euren perfekten Trip?',
    options: [
      { value: 'romance', label: '💕 Zweisamkeit\nZeit füreinander haben, ohne Ablenkung, intensive Gespräche' },
      { value: 'unique', label: '🌟 Etwas Besonderes\nEtwas erleben, was sonst niemand hat - einzigartige Stories sammeln' },
      { value: 'relaxation', label: '🧘‍♀️ Pure Entspannung\nEndlich mal runterkommen, Stress vergessen, Seele baumeln lassen' },
      { value: 'culture', label: '🎭 Kulturelle Erlebnisse\nNeue Welten entdecken, lernen, inspiriert werden' },
      { value: 'adventure', label: '🏔️ Outdoor Abenteuer\nAction, Adrenalin, unvergessliche Kulissen' },
      { value: 'party', label: '🎉 Feierei!!\nParty, Lachen, das Leben feiern' },
      { value: 'instagram', label: '📸 Instagram Moments\nWow-Momente schaffen, die alle neidisch machen' }
    ]
  },
  {
    id: 'accommodation',
    question: 'Wie sieht euer Zuhause auf Zeit aus?',
    options: [
      { value: 'luxury', label: '🛎️ Luxuriös\nInfinity Pool, Designer Möbel und Service, der keinen Wunsch offen lässt' },
      { value: 'charming', label: '🕯️ Charmant\nJahrhundertealte Mauern, Geschichten in jeder Ecke, Wein mit dem Besitzer' },
      { value: 'unique', label: '✨ Außergewöhnlich\nUnter Sternen schlafen, im Kloster meditieren, in Thermen baden - außergewöhnlich' },
      { value: 'remote', label: '🏔️ Abgeschottet\nAbgeschottet in der Natur, ohne Handynetz - nur Zeit für euch' }
    ]
  },
  {
    id: 'time_allocation',
    question: 'Wie möchtet ihr eure Auszeit verbringen?',
    isTimeAllocation: true,
     options: [
       { value: 'sightseeing', label: '🏛️ Sightseeing' },
       { value: 'culture', label: '🎨 Kunst & Geschichte' },
       { value: 'culinary', label: '🍝 Kulinarik' },
       { value: 'nightlife', label: '🍸 Nightlife' },
       { value: 'wellness', label: '💆 Wellness' },
       { value: 'active', label: '🥾 Sport & Aktiv' },
       { value: 'local', label: '🪗 Authentisch lokal' },
       { value: 'photography', label: '🌅 Traumlandschaften' }
     ]
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeAllocations, setTimeAllocations] = useState({});
  const [showCustomization, setShowCustomization] = useState(false);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
      }, 300);
    } else {
      // After the last question, move to email form
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
      }, 300);
    }
  };

  const handleTimeAllocation = (optionValue, value) => {
    const newValue = Math.max(0, Math.min(100, parseInt(value) || 0));
    
    // Calculate current total excluding the current option
    const currentTotal = Object.entries(timeAllocations)
      .filter(([key]) => key !== optionValue)
      .reduce((sum, [, val]) => sum + val, 0);
    
    // Calculate maximum allowed value for this option
    const maxAllowed = 100 - currentTotal;
    const finalValue = Math.min(newValue, maxAllowed);
    
    setTimeAllocations(prev => ({
      ...prev,
      [optionValue]: finalValue
    }));
  };

  const getTotalTimeAllocated = () => {
    return Object.values(timeAllocations).reduce((sum, val) => sum + val, 0);
  };

  const getRemainingTime = () => {
    return Math.max(0, 100 - getTotalTimeAllocated());
  };

  const canProceedFromTimeAllocation = () => {
    return getTotalTimeAllocated() === 100;
  };

  const resetTimeAllocations = () => {
    setTimeAllocations({});
    setShowCustomization(false);
  };


  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post('https://feschunterwegs.com/api/quiz', {
        answers,
        timeAllocations,
        email,
        firstName
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Es gab einen Fehler beim Absenden. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setEmail('');
    setFirstName('');
    setIsSubmitted(false);
    setTimeAllocations({});
    setShowCustomization(false);
  };

  if (isSubmitted) {
    return (
      <section id="quiz" className="section-padding bg-warm-50 border-b border-warm-200">
        <div className="container-editorial max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-editorial-100 rounded-lg flex items-center justify-center mx-auto mb-8 shadow-sm">
              <CheckCircle className="w-12 h-12 text-editorial-700" />
            </div>
            <h2 className="text-section mb-6 text-editorial-900 font-playfair">
              Danke! Wir schicken euch schon bald die besten Kurztrips für euer Gefühl.
            </h2>
            <p className="text-body mb-8 max-w-2xl mx-auto text-editorial-700 font-sans">
              Ihr werdet eine E-Mail mit euren personalisierten Reiseempfehlungen erhalten.
            </p>
            <button 
              onClick={resetQuiz}
              className="px-8 py-4 bg-white text-editorial-700 rounded-lg font-semibold hover:bg-editorial-50 border border-editorial-300 hover:border-editorial-400 transition-all duration-300 shadow-sm hover:shadow-md font-sans"
            >
              Quiz erneut starten
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="section-padding bg-warm-50 border-b border-warm-200">
      <div className="container-editorial max-w-4xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="section-badge mb-6">
            <div className="section-badge-dot"></div>
            <p className="text-caption">Unser Gespür</p>
          </div>
          <h2 className="text-section mb-6 text-editorial-900">
            Euer perfekter Lifestyle-Trip wartet
          </h2>
          <p className="text-body max-w-2xl mx-auto text-editorial-700 mb-8">
            Nach Jahren im Geschäft wissen wir: Es braucht nur 3 richtige Fragen, um euren Traumtrip zu finden. Während andere euch 50 Filter vorsetzen, haben wir es auf das Wesentliche reduziert. Quiz ausfüllen, perfekte Empfehlung bekommen – so einfach ist das.
          </p>
        </motion.div>

        <div className="card p-12 bg-white border border-editorial-200 shadow-editorial-lg">
          {/* Progress bar */}
          <div className="mb-12">
            <div className="flex justify-between text-caption text-coral-600 mb-4">
              <span>{currentQuestion < questions.length ? `Frage ${currentQuestion + 1} von ${questions.length}` : 'Empfehlungen erhalten'}</span>
              <span className="text-sm font-normal">{currentQuestion < questions.length ? `${Math.round(((currentQuestion + 1) / questions.length) * 100)}%` : '100%'}</span>
            </div>
            <div className="w-full bg-editorial-200 rounded-none h-1">
              <motion.div 
                className="bg-coral-500 h-1 rounded-none"
                initial={{ width: 0 }}
                animate={{ width: currentQuestion < questions.length ? `${((currentQuestion + 1) / questions.length) * 100}%` : '100%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {currentQuestion < questions.length ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Back button */}
                {currentQuestion > 0 && (
                  <div className="mb-8">
                    <button
                      onClick={goBack}
                      className="flex items-center text-editorial-600 hover:text-editorial-900 transition-colors duration-300"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Zurück
                    </button>
                  </div>
                )}
                
                 <h3 className="text-2xl font-medium mb-8 text-left text-editorial-900 whitespace-pre-line font-playfair">
                   {questions[currentQuestion].question}
                 </h3>
                
                {questions[currentQuestion].isTimeAllocation ? (
                  <div className="space-y-6">
                    {!showCustomization ? (
                      /* Step 1: Preset Selection */
                      <div className="space-y-6">
                        <div className="bg-editorial-50 rounded-lg p-6 border border-editorial-200">
                          <h5 className="text-lg font-semibold text-editorial-700 mb-4 font-sans text-center">Wählt euren Stil</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                              onClick={() => {
                                const balanced = {
                                  sightseeing: 12, culture: 12, culinary: 12, nightlife: 12,
                                  wellness: 12, active: 12, local: 12, photography: 12
                                };
                                setTimeAllocations(balanced);
                                setShowCustomization(true);
                              }}
                              className="p-6 bg-white hover:bg-editorial-100 text-editorial-700 rounded-lg border border-editorial-300 hover:border-editorial-400 transition-all duration-300 font-sans shadow-sm hover:shadow-md text-left"
                            >
                              <div className="text-3xl mb-3">⚖️</div>
                              <div className="text-lg font-semibold mb-2">Ausgewogen</div>
                              <div className="text-sm text-editorial-600">Alle Aktivitäten gleichmäßig verteilt</div>
                            </button>
                            
                            <button
                              onClick={() => {
                                const foodie = {
                                  sightseeing: 10, culture: 15, culinary: 40, nightlife: 15,
                                  wellness: 5, active: 5, local: 5, photography: 5
                                };
                                setTimeAllocations(foodie);
                                setShowCustomization(true);
                              }}
                              className="p-6 bg-white hover:bg-editorial-100 text-editorial-700 rounded-lg border border-editorial-300 hover:border-editorial-400 transition-all duration-300 font-sans shadow-sm hover:shadow-md text-left"
                            >
                              <div className="text-3xl mb-3">🍝</div>
                              <div className="text-lg font-semibold mb-2">Foodie-Fokus</div>
                              <div className="text-sm text-editorial-600">Kulinarische Erlebnisse im Mittelpunkt</div>
                            </button>
                            
                            <button
                              onClick={() => {
                                const slowEscape = {
                                  sightseeing: 10, culture: 15, culinary: 30, nightlife: 5,
                                  wellness: 25, active: 10, local: 3, photography: 2
                                };
                                setTimeAllocations(slowEscape);
                                setShowCustomization(true);
                              }}
                              className="p-6 bg-white hover:bg-editorial-100 text-editorial-700 rounded-lg border border-editorial-300 hover:border-editorial-400 transition-all duration-300 font-sans shadow-sm hover:shadow-md text-left"
                            >
                              <div className="text-3xl mb-3">🧘</div>
                              <div className="text-lg font-semibold mb-2">Slow Escape</div>
                              <div className="text-sm text-editorial-600">Wellness, Kulinarik und sanfte Aktivitäten</div>
                            </button>
                            
                            <button
                              onClick={() => {
                                const adventure = {
                                  sightseeing: 20, culture: 10, culinary: 15, nightlife: 10,
                                  wellness: 5, active: 30, local: 5, photography: 5
                                };
                                setTimeAllocations(adventure);
                                setShowCustomization(true);
                              }}
                              className="p-6 bg-white hover:bg-editorial-100 text-editorial-700 rounded-lg border border-editorial-300 hover:border-editorial-400 transition-all duration-300 font-sans shadow-sm hover:shadow-md text-left"
                            >
                              <div className="text-3xl mb-3">🥾</div>
                              <div className="text-lg font-semibold mb-2">Abenteuer-Fokus</div>
                              <div className="text-sm text-editorial-600">Sport, Aktivitäten und Outdoor-Erlebnisse</div>
                            </button>
                          </div>
                          
                          <div className="mt-6 text-center">
                            <button
                              onClick={() => setShowCustomization(true)}
                              className="px-6 py-3 bg-editorial-100 hover:bg-editorial-200 text-editorial-700 rounded-lg border border-editorial-300 hover:border-editorial-400 transition-all duration-300 font-sans"
                            >
                              ✏️ Individuell anpassen
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Step 2: Customization */
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h5 className="text-lg font-semibold text-editorial-700 font-sans">Individuelle Anpassung</h5>
                          <button
                            onClick={() => setShowCustomization(false)}
                            className="px-4 py-2 text-sm text-editorial-600 hover:text-editorial-800 transition-colors font-sans"
                          >
                            ← Zurück zu Presets
                          </button>
                        </div>

                        {/* Activity Cards with Sliders */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16" style={{marginBottom: '64px'}}>
                          {questions[currentQuestion].options.map((option, index) => {
                            const currentValue = timeAllocations[option.value] || 0;
                            const currentTotal = getTotalTimeAllocated();
                            const maxAllowed = 100 - (currentTotal - currentValue);
                            
                            return (
                               <motion.div
                                 key={option.value}
                                 className={`bg-white border border-editorial-200 rounded-lg p-4 transition-all duration-300 hover:shadow-sm ${
                                   currentValue > 0 ? 'border-editorial-400 bg-editorial-50' : 'border-editorial-200'
                                 }`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                         <div className="text-center mb-3">
                           <h5 className="text-base font-semibold text-editorial-900 mb-2 font-sans">
                             {option.label}
                           </h5>
                           <div className="text-base font-normal text-sage-700 font-sans">
                             {currentValue}%
                           </div>
                         </div>
                                
                                {/* Slider */}
                                <div className="space-y-2">
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={currentValue}
                                    onChange={(e) => handleTimeAllocation(option.value, e.target.value)}
                                    className="w-full h-2 bg-editorial-200 rounded-lg appearance-none cursor-pointer slider"
                                     style={{
                                       background: `linear-gradient(to right, #8a9e8a 0%, #8a9e8a ${currentValue}%, #dde3dd ${currentValue}%, #dde3dd 100%)`
                                     }}
                                  />
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* Continue Button */}
                        <div className="text-center">
                          <motion.button
                            onClick={() => {
                              if (canProceedFromTimeAllocation()) {
                                setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: timeAllocations }));
                                setTimeout(() => {
                                  setCurrentQuestion(prev => prev + 1);
                                }, 300);
                              }
                            }}
                            disabled={!canProceedFromTimeAllocation()}
                            className={`w-48 mx-auto py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
                              canProceedFromTimeAllocation()
                                ? 'bg-coral-500 text-white hover:bg-coral-600'
                                : 'bg-editorial-200 text-editorial-500 cursor-not-allowed'
                            }`}
                            whileHover={canProceedFromTimeAllocation() ? { scale: 1.02 } : {}}
                            whileTap={canProceedFromTimeAllocation() ? { scale: 0.98 } : {}}
                          >
                            Weiter
                          </motion.button>
                        </div>

                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {questions[currentQuestion].options.map((option, index) => (
                       <motion.button
                         key={option.value}
                         className="w-full p-6 text-left border border-editorial-200 rounded-lg hover:border-editorial-400 hover:bg-editorial-50 bg-white transition-all duration-300 group shadow-sm hover:shadow-md"
                         onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
                       >
                         <span className="text-base leading-relaxed text-editorial-700 group-hover:text-editorial-900 transition-colors duration-300 whitespace-pre-line font-sans">
                           {option.label}
                         </span>
                       </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="email-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Back button */}
                <div className="mb-8">
                  <button
                    onClick={goBack}
                    className="flex items-center text-editorial-600 hover:text-editorial-900 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Zurück zu den Fragen
                  </button>
                </div>
                
                <div className="text-center mb-12">
                  <div className="w-20 h-20 bg-editorial-100 rounded-lg flex items-center justify-center mx-auto mb-8 shadow-sm">
                    <Mail className="w-10 h-10 text-editorial-700" />
                  </div>
                  <h3 className="text-2xl font-medium mb-6 text-editorial-900 font-playfair">
                    Eure perfekten Auszeiten warten bereits.
                  </h3>
                  <p className="text-body max-w-2xl mx-auto text-editorial-700 font-sans">
                    Basierend auf euren Antworten kuratieren wir handverlesene Erlebnisse. Tragt eure E-Mail ein und wir schicken sie euch – mit allem, was ihr wissen müsst.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="text-center">
                  <div className="mb-8 grid grid-cols-1 md:grid-cols-[30%_70%] gap-4">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Dein Name"
                      className="w-full p-6 border border-editorial-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-editorial-500 focus:border-transparent text-body font-sans shadow-sm"
                      required
                    />
                    
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Deine E-Mail-Adresse"
                      className="w-full p-6 border border-editorial-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-editorial-500 focus:border-transparent text-body font-sans shadow-sm"
                      required
                    />
                  </div>
                  
                  <div className="mb-8 text-left space-y-4">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-1 w-4 h-4 text-coral-500 border-editorial-300 rounded focus:ring-coral-500"
                        required
                      />
                      <span className="text-sm text-editorial-700 font-sans">
                        Ich akzeptiere die <a href="/agb" className="text-coral-500 hover:text-coral-600 underline">AGB</a> und <a href="/datenschutz" className="text-coral-500 hover:text-coral-600 underline">Datenschutzbestimmungen</a> *
                      </span>
                    </label>
                    
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-1 w-4 h-4 text-coral-500 border-editorial-300 rounded focus:ring-coral-500"
                      />
                      <span className="text-sm text-editorial-700 font-sans">
                        Ja, ich möchte die ersten sein, die von neuen Geheimtipps und exklusiven Angeboten erfahren – direkt in meinem Postfach
                      </span>
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-64 mx-auto bg-coral-500 text-white text-lg py-6 rounded-lg font-semibold hover:bg-coral-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl font-sans"
                  >
                    {isSubmitting ? 'Wird gesendet...' : 'Empfehlungen erhalten'}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
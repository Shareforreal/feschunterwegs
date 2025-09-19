import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Mail } from 'lucide-react';
import axios from 'axios';

const questions = [
  {
    id: 'trip_type',
    question: 'Was ist das Wichtigste für euren perfekten Trip?',
    options: [
      { value: 'romance', label: '💕 Zweisamkeit\nZeit füreinander haben, ohne Ablenkung' },
      { value: 'unique', label: '🌟 Etwas Besonderes\nEin außergewöhnliches Erlebnis, das wir so noch nie hatten' },
      { value: 'relaxation', label: '🧘‍♀️ Pure Entspannung\nEndlich mal runterkommen, Stress vergessen, Seele baumeln lassen' },
      { value: 'culture', label: '🎭 Kulturelle Erlebnisse\nNeue Welten entdecken, lernen, inspiriert werden' },
      { value: 'adventure', label: '🏔️ Outdoor Abenteuer\nAction, Adrenalin und unvergessliche Kulissen' },
      { value: 'party', label: '🎉 Feierei!!\nGenießen, Lachen, das Leben feiern' }
    ]
  },
  {
    id: 'accommodation',
    question: 'Wie sieht euer Zuhause auf Zeit aus?',
    options: [
      { value: 'luxury', label: '🛎️ Luxuriös\nInfinity Pool, Butler-Service und Designer-Suiten, die keine Wünsche offen lassen' },
      { value: 'boutique', label: '💄 Boutique\nStilvolle Hideaways mit individuellem Design und persönlichem Service zum Verlieben' },
      { value: 'charming', label: '🕯️ Traditionell\nJahrhundertealte Mauern, authentische Geschichten und Wein mit dem Gastgeber' },
      { value: 'unique', label: '✨ Außergewöhnlich\nUnter Sternen schlafen, im Baumhaus träumen oder in Burgen residieren' },
      { value: 'remote', label: '🏔️ Zurückgezogen\nVersteckte Refugien in der Natur, perfekt zum Abschalten und gemeinsame Zeit genießen' }
    ]
  },
  {
    id: 'must_have',
    question: 'Was dürfen wir auf keinen Fall vergessen?',
    isMultipleSelection: true,
    minSelections: 2,
    maxSelections: 4,
    options: [
      { value: 'culinary', label: '🍷 Kulinarische Höhepunkte' },
      { value: 'culture', label: '🏛️ Kulturelle Erlebnisse' },
      { value: 'wellness', label: '💆 Wellness & Entspannung' },
      { value: 'sports', label: '🥾 Sport & Outdoor-Aktivitäten' },
      { value: 'shopping', label: '🛍️ Shopping & Märkte' },
      { value: 'nightlife', label: '🍸 Nightlife & Bars' },
      { value: 'events', label: '🎭 Lokale Events & Konzerte' },
      { value: 'photography', label: '📸 Besondere Orte & Fotospots' }
    ]
  },
  {
    id: 'backdrop',
    question: 'Welche Kulisse macht euren Trip perfekt?',
    options: [
      { value: 'mountains', label: '🏔️ Berge & Natur' },
      { value: 'water', label: '🌊 Seen & Flüsse' },
      { value: 'historic', label: '🏛️ Historische Städte' },
      { value: 'modern', label: '🌆 Moderne Metropolen' },
      { value: 'any', label: '🤷‍♀️ Ist uns egal, Hauptsache schön' }
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
  const [multipleSelections, setMultipleSelections] = useState({});

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

  const handleMultipleSelection = (questionId, optionValue) => {
    const currentSelections = multipleSelections[questionId] || [];
    const isSelected = currentSelections.includes(optionValue);
    
    let newSelections;
    if (isSelected) {
      // Remove selection
      newSelections = currentSelections.filter(val => val !== optionValue);
    } else {
      // Add selection (check max limit)
      const question = questions.find(q => q.id === questionId);
      const maxSelections = question?.maxSelections || 4;
      
      if (currentSelections.length < maxSelections) {
        newSelections = [...currentSelections, optionValue];
      } else {
        return; // Don't add if at max limit
      }
    }
    
    setMultipleSelections(prev => ({
      ...prev,
      [questionId]: newSelections
    }));
  };

  const canProceedFromMultipleSelection = (questionId) => {
    const question = questions.find(q => q.id === questionId);
    const currentSelections = multipleSelections[questionId] || [];
    const minSelections = question?.minSelections || 0;
    const maxSelections = question?.maxSelections || 4;
    
    return currentSelections.length >= minSelections && currentSelections.length <= maxSelections;
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
        multipleSelections,
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
    setMultipleSelections({});
  };

  if (isSubmitted) {
    return (
      <section id="quiz" className="section-padding bg-warm-50 border-b border-warm-200">
        <div className="container-editorial max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Thank you message box */}
            <div className="bg-gradient-to-br from-coral-50 to-coral-100 border-2 border-coral-200 rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden">
              {/* Decorative background pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-coral-200/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-coral-300/20 rounded-full translate-y-12 -translate-x-12"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="w-20 h-20 bg-coral-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-6 border border-coral-200/50 shadow-sm">
                  <h2 className="text-2xl md:text-3xl mb-4 text-coral-900 font-playfair font-bold leading-tight">
                    Danke! Wir schicken euch schon bald die besten Kurztrips für euer Gefühl.
                  </h2>
                  <p className="text-lg text-coral-800 font-sans leading-relaxed">
                    Ihr werdet eine E-Mail mit euren personalisierten Reiseempfehlungen erhalten.
                  </p>
                </div>
                
                <button 
                  onClick={resetQuiz}
                  className="px-8 py-4 bg-coral-500 text-white rounded-xl font-semibold hover:bg-coral-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 font-sans text-lg"
                >
                  Quiz erneut starten
                </button>
              </div>
            </div>
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
                
                {questions[currentQuestion].isMultipleSelection ? (
                  <div className="space-y-6">
                    <div className="bg-editorial-50 rounded-lg p-6 border border-editorial-200 mb-6">
                      <p className="text-sm text-editorial-600 text-center font-sans">
                        Wählt {questions[currentQuestion].minSelections} bis {questions[currentQuestion].maxSelections} Optionen aus
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {questions[currentQuestion].options.map((option, index) => {
                        const currentSelections = multipleSelections[questions[currentQuestion].id] || [];
                        const isSelected = currentSelections.includes(option.value);
                        const canSelect = currentSelections.length < questions[currentQuestion].maxSelections || isSelected;
                        
                        return (
                          <motion.button
                            key={option.value}
                            onClick={() => handleMultipleSelection(questions[currentQuestion].id, option.value)}
                            disabled={!canSelect}
                            className={`p-6 text-center border rounded-lg transition-all duration-300 font-sans shadow-sm hover:shadow-md ${
                              isSelected
                                ? 'bg-coral-500 text-white border-coral-500 shadow-md'
                                : canSelect
                                ? 'bg-white text-editorial-700 border-editorial-200 hover:border-editorial-400 hover:bg-editorial-50'
                                : 'bg-editorial-100 text-editorial-400 border-editorial-200 cursor-not-allowed'
                            }`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={canSelect ? { scale: 1.02 } : {}}
                            whileTap={canSelect ? { scale: 0.98 } : {}}
                          >
                            <div className="text-3xl mb-3">{option.label.split(' ')[0]}</div>
                            <div className="text-sm font-semibold leading-tight">
                              {option.label.split(' ').slice(1).join(' ')}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Continue Button */}
                    <div className="text-center mt-8">
                      <motion.button
                        onClick={() => {
                          if (canProceedFromMultipleSelection(questions[currentQuestion].id)) {
                            setAnswers(prev => ({ 
                              ...prev, 
                              [questions[currentQuestion].id]: multipleSelections[questions[currentQuestion].id] 
                            }));
                            setTimeout(() => {
                              setCurrentQuestion(prev => prev + 1);
                            }, 300);
                          }
                        }}
                        disabled={!canProceedFromMultipleSelection(questions[currentQuestion].id)}
                        className={`w-48 mx-auto py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
                          canProceedFromMultipleSelection(questions[currentQuestion].id)
                            ? 'bg-coral-500 text-white hover:bg-coral-600'
                            : 'bg-editorial-200 text-editorial-500 cursor-not-allowed'
                        }`}
                        whileHover={canProceedFromMultipleSelection(questions[currentQuestion].id) ? { scale: 1.02 } : {}}
                        whileTap={canProceedFromMultipleSelection(questions[currentQuestion].id) ? { scale: 0.98 } : {}}
                      >
                        Weiter
                      </motion.button>
                    </div>
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
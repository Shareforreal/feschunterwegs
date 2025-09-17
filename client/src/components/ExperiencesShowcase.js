import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronLeft, ChevronRight, Clock, Users, X, Calendar, User, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const experiences = [
  {
    id: 1,
    image: "/images/Schloss-Freudenstein_Aussenfassade.webp",
    caption: "Das Geheimnis der goldenen Hänge",
    title: "Schloss Freudenstein | Südtiroler Weinstraße",
    location: "Eppan, Südtirol",
    travelTime: "3h 30min mit dem Auto",
    duration: "3 Tage",
    groupSize: "2 Personen",
    price: "1.190€",
    originalPrice: "1.340€",
    description: "Palmen zwischen Zypressen. Goldene Weinberge. Wein, der nach Sonne schmeckt. Hier erlebt ihr, warum manche Orte süchtig machen – mediterranes Flair auf 300m Höhe, wo die Dolomiten am Horizont tanzen.",
    details: [
      "2× Übernachtungen in historischer Schlosssuite",
      "Private Weinberg-Tour mit Sunset-Degustation bei den Winzerfamilien",
      "Kellerei Tramin – Architektur-Highlight mit exklusiver Führung",
      "Authentisches Törggelen in 400 Jahre alter Bauernstube mit frischem Suser",
      "Kalterer See Experience – Baden im wärmsten Alpensee",
      "Gourmet-Dinner mit Südtiroler Spezialitäten"
    ],
    testimonial: "Hier verstehe ich, warum manche Menschen ihr Leben lang nach diesem einen perfekten Wein suchen.",
    images: [
      "/images/Schloss-Freudenstein_Suite_Matthias.jpeg",
      "/images/Schloss-Freudenstein_Lobby.jpg",
      "/images/Schloss-Freudenstein_Esstischgruppen-auf-Balkon-mit-Weinpflanzen.jpg",
      "/images/Schloss-Freudenstein_Gedeckter-Tisch-fuer-zwei-draussen.jpeg",
      "/images/Schloss-Freudenstein_Gaestin-mit-Badeanzug-am-Pool.jpg",
      "/images/Schloss-Freudenstein_Rennradfahrer.jpg",
      "/images/Schloss-Freudenstein_Kellner-schenkt-Wein-ein.jpg",
      "/images/Schloss-Freudenstein_Gesichtsmassage.jpg",
      "/images/Schloss-Freudenstein_Hochzeitsgesellschaft.jpg",
      "/images/Schloss-Freudenstein_Aussenfassade.webp",
      "/images/Schloss-Freudenstein_Tortellini-mit-Edamame-Morcheln-und-Sprossen.jpeg",
      "/images/Schloss-Freudenstein_Dessertbuffet-Hochzeit.jpeg",
      "/images/Schloss-Freudenstein_Frau-am-Kalterer-See.jpg"
    ]
  },
  {
    id: 2,
    image: "/images/Hotel Hirschen_Pool.jpg",
    caption: "Showroom for the Good Life",
    title: "Hotel Hirschen | Bregenzerwald",
    location: "Schwarzenberg, Österreich",
    travelTime: "2h 15min mit dem Auto",
    duration: "3 Tage", 
    groupSize: "2 Personen",
    price: "1.150€",
    originalPrice: "1.280€",
    description: "270 Jahre alte Seele in moderner Hülle. Hier trifft Kunst auf Architektur, Tradition auf Innovation. Umgeben von den weltberühmten Krumbach-Bushaltestellen und dem 'schönsten Platz Österreichs'.",
    details: [
      "2× Übernachtungen im preisgekrönten Design-Hotel",
      "Fermentation Masterclass – Führung durch den hauseigenen Koji-Keller",
      "Lomi Lomi Massage im neuen Badehaus",
      "Körbersee-Wanderung zum 'schönsten Platz Österreichs' (1.600m)",
      "Krumbach Architektur-Tour zu den weltberühmten Bushaltestellen",
      "Vollzugang zum legendären Spa-Bereich",
      "4-Gang Carte Blanche Menü"
    ],
    testimonial: "Zum ersten Mal seit Jahren spüre ich wieder, wie sich echte Ruhe anfühlt.",
    images: [
      "/images/Hotel Hirschen_Pool.jpg",
      "/images/Hirschen Hotel_Aussenansicht des Hotels.avif",
      "/images/Hotel Hirschen_Frau liest Magazin.jpg",
      "/images/Hirschen Hotel_Schlafzimmer mit Doppelbett.avif",
      "/images/Hirschen Hotel_Badezimmer mit begehbarer Dusche.webp",
      "/images/Hirschen Hotel_Arbeitsplatz im Schlafzimmer.avif",
      "/images/Hirschen Hotel_Tisch in der Suite.avif",
      "/images/Hirschen Hotel_Hinterhof im Hotel.webp",
      "/images/Hirschen Hotel_Unterhaltung unter Freunden am Tisch.webp",
      "/images/Hotel Hirschen_Salat mit Tomaten.jpg",
      "/images/Hirschen Hotel_Yogaraumen mit Matten.webp",
      "/images/Hirschen Hotel_Brombeer Toertchen.jpg"
    ]
  },
  {
    id: 3,
    image: "/images/Prati_Palai_Pool_Sommer.jpg",
    caption: "Geheimtipp par excellence",
    title: "Prati Palai | Gardasee", 
    location: "Bardolino, Italien",
    travelTime: "4h 45min mit dem Auto",
    duration: "4 Tage",
    groupSize: "2 Personen", 
    price: "980€",
    originalPrice: "1.120€",
    description: "Nur acht Zimmer über Bardolinos Dächern. Adults Only – perfekte Ruhe garantiert. Hier gehört ihr zum inneren Kreis derer, die wissen, wo das echte Italien versteckt ist.",
    details: [
      "3× Übernachtungen in exklusiver Suite",
      "Italienisches Gourmet-Frühstück (bereits inkludiert)",
      "Pool mit unschlagbarem Gardasee-Blick",
      "E-Bike-Tour durch 18 Hektar Olivenhaine und Zypressen",
      "Hausgemachter Limoncello aus eigenen Garten-Zitronen",
      "Aperitivo-Workshop auf der Panorama-Terrasse",
      "Romantisches Candlelight-Dinner"
    ],
    testimonial: "Das ist Bayern, wie ich es mir immer gewünscht habe – authentisch und trotzdem überraschend.",
    images: [
      "/images/Prati_Palai_Pool_Sommer.jpg",
      "/images/Prati_Palai_Aussenfassade.jpg",
      "/images/Prati_Palai_Pool.jpg",
      "/images/Prati_Palai_Suite3.jpg",
      "/images/Prati_Palai_Suite6.jpg",
      "/images/Prati_Palai_Blaue Badewanne.jpg",
      "/images/Prati_Palai_Blick aus dem Fenster.jpg",
      "/images/Prati_Palai_Sonnenuntergang.jpg",
      "/images/Prati_Palai_Apertif auf der Terrasse.jpg",
      "/images/Prati_Palai_Bardolino Hafen.webp",
      "/images/Prati_Palai_Bardolino Innenstadt.webp",
      "/images/Prati_Palai_Weinernte.jpg",
      "/images/Prati_Palai_Weinreben.jpg"
    ]
  },
  {
    id: 4,
    image: "/images/Blaue Gans_Hotelgang.jpg",
    caption: "Kultur-Hotspot für Ästheten",
    title: "Arthotel Blaue Gans | Salzburg",
    location: "Salzburg, Österreich",
    travelTime: "1h 30min mit dem Auto • 1h 45min mit der Bahn",
    duration: "3 Tage",
    groupSize: "2 Personen",
    price: "780€",
    originalPrice: "890€", 
    description: "Beuys und Gilbert & George in 700 Jahre alten Mauern. Der Kultur-Hotspot für alle, die ihre Ästhetik ernst nehmen. Hier schlägt das Kunstherz von Mozarts Stadt.",
    details: [
      "2× Übernachtungen im kunst-kuratierten Ambiente",
      "Private Kunstführung mit Hausherr Andreas Gfrerer",
      "Original Mozartkugeln in der Konditorei Fürst",
      "Coffee-Zeremonie in der Kaffee-Alchemie",
      "Kapuzinerberg Sunset-Tour zu den schönsten Aussichtspunkten",
      "Kultur-Abendmenü im hoteleigenen Restaurant"
    ],
    testimonial: "Ein Hotel, das mich daran erinnert, warum ich Kunst so liebe.",
    images: [
      "/images/Blaue Gans_Hotelgang.jpg",
      "/images/Blaue-Gans_Lobby_Theke.jpg",
      "/images/Salzburg_Schloss.jpg",
      "/images/Blaue Gans_Aussenbereich_Restaurant.jpg",
      "/images/Blaue Gans_Restaurant.jpg",
      "/images/Blaue Gans_Cocktailglas im Sonnenlicht.jpg",
      "/images/Blaue Gans_Frische Brioche Broetchen.jpg",
      "/images/Blaue Gans_Vorspeise.jpg",
      "/images/Blaue Gans_Hauptspeise mit Parmesanreibe.jpg",
      "/images/Blaue Gans_Loveletter.jpg",
      "/images/Salzburg_Innenstadt.png",
      "/images/Salzburg_Sonnenuntergang.jpg"
    ]
  },
  {
    id: 5,
    image: "/images/Rosso_Herbstbild_Sonnenterrasse.jpg",
    caption: "Bayern meets Bella Vita",
    title: "Hotel Rosso | Allgäu",
    location: "Altusried, Allgäu",
    travelTime: "1h 45min mit dem Auto",
    duration: "4 Tage", 
    groupSize: "2 Personen",
    price: "1.180€",
    originalPrice: "1.320€",
    description: "Der Hof der unbegrenzten Möglichkeiten. Bodenständigkeit mit italienischem Flair – genau das richtige Maß zwischen authentisch und besonders. Alpenpanorama inklusive.",
    details: [
      "3× Übernachtungen (Mindestaufenthalt)",
      "Alpaka-Wanderung durch herbstliche Wiesen",
      "Sunrise-Yoga auf der Bergwiese",
      "SUP-Tour auf der mäandernden Iller",
      "Hauchenberg-Panorama – 360°-Blick über das Allgäu",
      "Kräuter-Workshop aus dem eigenen Garten",
      "2× Abendmenü mit italienisch-bayerischer Fusionsküche"
    ],
    testimonial: "Endlich mal ein Ort, wo man Italien wirklich abseits der Touristenmassen erlebt.",
    images: [
      "/images/Rosso_Seitenansicht-auf-Untekrunft-mit-gemuetlicher-Terrasse_Desktop.jpg",
      "/images/Rosso_Doppelbett-mit-Schaukel-und-Kamin.jpg",
      "/images/Rosso_Freistehende-Badewanne.jpg",
      "/images/Rosso_Gedeckter-Balkontisch-mit-Limonade.jpg",
      "/images/Rosso_Gedeckter-Tisch-mit-lokalen-Koestlichkeiten.jpg",
      "/images/Rosso_Herbstbild_Sonnenterrasse.jpg",
      "/images/Rosso_Holzesstisch-mit-Designerstuehlen.jpg",
      "/images/Rosso_Kueche-mit-Gasherd.jpg",
      "/images/Rosso_Teich-mit-Unterkunft-im-Hintergrund.jpg",
      "/images/Rosso_Umgebung_Springende-Ziegen-auf-der-gruenen-Wiese.jpg",
      "/images/Rosso_Yoga-Raum-mit-schwarzen-Yogamatten.jpg",
      "/images/Rosso_Buch-liegt-auf-Holzfenstersims.jpg",
      "/images/Rosso_Familienaufenthalt.jpg"
    ]
  },
  {
    id: 6,
    image: "/images/Blyb_Tegernsee Steg.jpg",
    caption: "Münchner Williamsburg",
    title: "Blyb. | Tegernsee",
    location: "Gmund, Tegernsee",
    travelTime: "45min mit dem Auto • 1h 15min mit der Bahn",
    duration: "3 Tage",
    groupSize: "2 Personen",
    price: "650€",
    originalPrice: "750€",
    description: "Bayerische Tradition, neu interpretiert. Der Ort, an dem sich euer München-Herz zu Hause fühlt – nur schöner. Hier trifft spektakuläre vegetarische Küche auf Bavarian Sashimi.",
    details: [
      "2× Übernachtungen im Design-Refugium",
      "Veggie-Gourmet-Frühstück (bereits inkludiert)",
      "5-Gang-Menü von Jacques Thull – vegetarische Haute Cuisine",
      "Bavarian Sashimi Workshop – revolutionäre Pflanzentechnik",
      "Sauna im Gartenhaus mit direktem Seeblick",
      "Pizza-Lab im gläsernen Bakery-Haus",
      "Hot Tub Entspannung zwischen Garten und See"
    ],
    testimonial: "Hier esse ich das beste vegetarische Essen meines Lebens – und ich bin Fleischesser.",
    images: [
      "/images/Blyb_Tegernsee Steg.jpg",
      "/images/Blyb_Bett mit weissen Lacken.jpg",
      "/images/Blyb_Badezimmer mit begehbarer Dusche.jpg",
      "/images/Blyb_Fruehstueckstisch.jpg",
      "/images/Blyb_Wohnzimmertisch.jpg",
      "/images/Blyb_Zeitunglesen im Bett.jpg",
      "/images/Blyb_Gemeinsame_Yogasession.jpg",
      "/images/Blyb_Sauna im Wald.jpg",
      "/images/Blyb_Hot Tub aus Holz.jpg",
      "/images/Blyb_Gericht_Vorspeisse.jpg",
      "/images/Blyb_Gericht_Rote-Beete-Suppe-mit-Fisch.jpg",
      "/images/Blyb_Gericht_Hauptgericht.jpg",
      "/images/Blyb_Barkeeper macht Cocktail.jpg",
      "/images/Blyb_Gartenfest mit Discokugel.jpg",
      "/images/Blyb_DJ am Gartenfest.jpg",
      "/images/Blyb_Sommerfest_Konzert.jpg"
    ]
  }
];

const ExperienceCard = ({ experience, index, isExpanded, onToggle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationData, setReservationData] = useState({
    firstName: '',
    lastName: '',
    arrival: '',
    departure: '',
    guests: 2,
    wishes: '',
    email: '',
    phone: '',
    termsAccepted: false,
    marketingAccepted: false
  });

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === 0 ? experience.images.length - 1 : prev - 1
    );
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === experience.images.length - 1 ? 0 : prev + 1
    );
  };

  const goToImage = (e, index) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          experience: experience.title,
          ...reservationData
        }),
      });
      
      if (response.ok) {
        alert('Reservierungsanfrage erfolgreich gesendet! Wir melden uns zeitnah bei Ihnen.');
        setShowReservationForm(false);
        setReservationData({
          firstName: '',
          lastName: '',
          arrival: '',
          departure: '',
          guests: 2,
          wishes: '',
          email: '',
          phone: '',
          termsAccepted: false,
          marketingAccepted: false
        });
      } else {
        throw new Error('Reservierung fehlgeschlagen');
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert('Es gab einen Fehler bei der Reservierung. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReservationData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={() => onToggle(experience.id)}
    >
      {/* Creative Image Layout */}
      <div className="relative mb-8">
        <div className="relative aspect-square image-creative">
          <img 
            src={experience.image} 
            alt={experience.caption}
            className="w-full h-full object-cover"
          />
          
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          
          {/* "Hierhin gehen" Badge */}
          <div className="absolute top-4 right-4 bg-coral-500 text-white rounded-full px-4 py-2 shadow-lg">
            <span className="font-semibold text-sm">Hierhin gehen</span>
          </div>
        </div>
        
        {/* Creative accent line */}
        <div className="accent-line"></div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Poetic Caption */}
        <p className="text-lg leading-relaxed text-sage-600 font-medium italic mb-2">
          {experience.caption}
        </p>
        
        {/* Title */}
        <h3 className="text-2xl font-semibold text-gray-900 leading-tight">
          {experience.title}
        </h3>
        
        {/* Travel Time */}
        <div className="flex items-center space-x-2 text-sm text-sage-600 font-medium">
          <Clock className="w-4 h-4" />
          <span>{experience.travelTime}</span>
        </div>


        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="space-y-6 pt-6 border-t border-gray-200">
                {/* Description */}
                <div>
                  <p className="text-base text-gray-700 leading-relaxed">{experience.description}</p>
                </div>

                {/* Image Gallery */}
                <div className="space-y-6">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-warm-100">
                    <motion.img 
                      key={currentImageIndex}
                      src={experience.images[currentImageIndex]} 
                      alt={`${experience.title} ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Navigation arrows */}
                    {experience.images.length > 1 && (
                      <>
                        <button 
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4 text-gray-700" />
                        </button>
                        <button 
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
                        >
                          <ChevronRight className="w-4 h-4 text-gray-700" />
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Image dots/thumbnails */}
                  {experience.images.length > 1 && (
                    <div className="flex justify-center space-x-3">
                      {experience.images.map((img, index) => (
                        <button
                          key={index}
                          onClick={(e) => goToImage(e, index)}
                          className={`relative overflow-hidden rounded transition-all duration-200 ${
                            currentImageIndex === index 
                              ? 'ring-2 ring-gray-800 w-16 h-10' 
                              : 'w-12 h-8 opacity-60 hover:opacity-80'
                          }`}
                        >
                          <img 
                            src={img} 
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-1">
                    <Clock className="w-4 h-4 text-gray-500 mx-auto" />
                    <span className="text-base text-gray-600">{experience.duration}</span>
                  </div>
                  <div className="space-y-1">
                    <Users className="w-4 h-4 text-gray-500 mx-auto" />
                    <span className="text-base text-gray-600">{experience.groupSize}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-3">Was dich erwartet</h4>
                  <ul className="space-y-2">
                    {experience.details.map((detail, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-base text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Duration & Group Size */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600">{experience.duration} • {experience.groupSize}</p>
                  </div>
                  
                  {/* Testimonial */}
                  {experience.testimonial && (
                    <div className="bg-warm-50 p-4 rounded-lg mb-4">
                      <p className="text-sm italic text-gray-700 text-center">"{experience.testimonial}"</p>
                    </div>
                  )}
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowReservationForm(true);
                    }}
                    className="w-full btn-primary text-base px-6 py-3"
                  >
                    Jetzt reservieren
                  </button>
                </div>
                
                {/* Collapse indicator */}
                <div className="flex items-center justify-center pt-2">
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reservation Form Modal */}
        <AnimatePresence>
          {showReservationForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowReservationForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">Reservierung anfragen</h3>
                    <p className="text-sm text-gray-600 mt-1">{experience.title}</p>
                  </div>
                  <button
                    onClick={() => setShowReservationForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleReservationSubmit} className="p-6 space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-1" />
                        Vorname *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={reservationData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-editorial-500 focus:border-editorial-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-1" />
                        Nachname *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={reservationData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-editorial-500 focus:border-editorial-500"
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={reservationData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-editorial-500 focus:border-editorial-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-1" />
                        Telefonnummer
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={reservationData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-editorial-500 focus:border-editorial-500"
                      />
                    </div>
                  </div>

                  {/* Travel Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Anreise
                      </label>
                      <input
                        type="date"
                        name="arrival"
                        value={reservationData.arrival}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-editorial-500 focus:border-editorial-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Abreise
                        {experience.duration.includes('4') && (
                          <span className="text-xs text-amber-600 ml-1">(Mindestaufenthalt: 3 Nächte)</span>
                        )}
                      </label>
                      <input
                        type="date"
                        name="departure"
                        value={reservationData.departure}
                        onChange={handleInputChange}
                        min={reservationData.arrival || new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-editorial-500 focus:border-editorial-500"
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="w-4 h-4 inline mr-1" />
                      Anzahl Personen
                    </label>
                    <select
                      name="guests"
                      value={reservationData.guests}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-editorial-500 focus:border-editorial-500"
                    >
                      <option value={1}>1 Person</option>
                      <option value={2}>2 Personen</option>
                      <option value={3}>3 Personen</option>
                      <option value={4}>4 Personen</option>
                      <option value={5}>5 Personen</option>
                      <option value={6}>6 Personen</option>
                    </select>
                  </div>

                  {/* Special Wishes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Erzählt uns von euren Träumen
                    </label>
                    <textarea
                      name="wishes"
                      value={reservationData.wishes}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Was macht euren perfekten Trip aus? Besondere Erlebnisse, Diätwünsche, Allergien, romantische Überraschungen – wir hören zu und machen es möglich."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-editorial-500 focus:border-editorial-500"
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={reservationData.termsAccepted}
                        onChange={handleInputChange}
                        required
                        className="mt-1 h-4 w-4 text-editorial-600 focus:ring-editorial-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        Ich akzeptiere die <Link to="/agb" className="text-editorial-600 hover:underline">AGB</Link> und <Link to="/datenschutz" className="text-editorial-600 hover:underline">Datenschutzbestimmungen</Link> *
                      </span>
                    </label>
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="marketingAccepted"
                        checked={reservationData.marketingAccepted}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-editorial-600 focus:ring-editorial-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        Ja, ich möchte die ersten sein, die von neuen Geheimtipps und exklusiven Angeboten erfahren – direkt in meinem Postfach
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowReservationForm(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-warm-50 transition-colors"
                    >
                      Abbrechen
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !reservationData.termsAccepted}
                      className="flex-1 btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Wird gesendet...' : 'Reservierung anfragen'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </motion.div>
  );
};

const ExperiencesShowcase = () => {
  const [expandedCards, setExpandedCards] = useState(new Set());

  const handleToggleCard = (cardId) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  return (
    <section className="section-padding bg-warm-50 border-b border-warm-200 relative overflow-hidden">
      
      <div className="container-editorial relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="section-badge mb-6">
            <div className="section-badge-dot"></div>
            <p className="text-caption">Unsere Erlebnisse</p>
          </div>
          <h2 className="text-section mb-6 text-editorial-900">
            Erlebnisse, die unter die Haut gehen.
          </h2>
          <p className="text-body max-w-2xl mx-auto text-editorial-700 mb-8">
            Handverlesene Wochenendtrips im Umkreis von 400km – für alle, die das Außergewöhnliche im scheinbar Gewöhnlichen finden.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {experiences.map((experience, index) => (
            <ExperienceCard 
              key={experience.id} 
              experience={experience} 
              index={index}
              isExpanded={expandedCards.has(experience.id)}
              onToggle={handleToggleCard}
            />
          ))}
        </div>
        
        {/* Footer Note */}
      </div>
    </section>
  );
};

export default ExperiencesShowcase;
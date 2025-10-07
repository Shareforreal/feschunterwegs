import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronLeft, ChevronRight, Users, X, Calendar, User, Mail, Phone, Car, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const experiences = [
  {
    id: 1,
    image: "/images/Schloss-Freudenstein_Aussenfassade.webp",
    caption: "Wein & Kulinarik im historischen Gemäuer",
    title: "Schloss Freudenstein | Südtiroler Weinstraße",
    category: "Schlossleben in Südtirol",
    location: "Eppan, Südtirol",
    anchorId: "experiences-eppan",
    travelTime: "3h 30min",
    duration: "3 Tage",
    minimumStay: "2 Nächte",
    groupSize: "2 Personen",
    price: "1.370€",
    highlights: [
      "Wohne in einem echten Schloss",
      "Verkoste Weine aus dem Schlossgut",
      "Spätherbstbaden im Kalterer See"
    ],
    description: "Palmen zwischen Zypressen. Goldene Weinberge. Wein, der nach Sonne schmeckt. Hier erlebt ihr, warum manche Orte süchtig machen – mediterranes Flair auf 300m Höhe, wo die Dolomiten am Horizont tanzen.",
    details: [
      "2× Übernachtungen in der Schlosssuite – Aufwachen mit Weinberg-Panorama",
      "1× Private Weinberg-Tour & Sunset-Tasting – Direkt mit den Winzern vor Ort",
      "1× Führung in der Kellerei Tramin – Wo Südtirols Spitzenweine entstehen",
      "1× Törggelen-Experience – Herzhaft, traditionell, nur hier so authentisch",
      "1× Sprung in den Kalterer See – Abkühlung im wärmsten Alpensee",
      "1× Gourmet-Dinner mit Südtiroler Spezialitäten"
    ],
    testimonial: "Einfach magisch! Die Schlosssuite war atemberaubend, und die Weinberg-Tour bei Sonnenuntergang war pure Poesie. Wir haben uns wie Könige gefühlt.",
    testimonialAuthor: "Emily P.",
    mediaMention: "Empfohlen von Vanity Fair und GQ Italia",
    images: [
      "/images/Schloss-Freudenstein_Lobby.jpg",
      "/images/Schloss-Freudenstein_Suite_Matthias.jpeg",
      "/images/Schloss-Freudenstein_Esstischgruppen-auf-Balkon-mit-Weinpflanzen.jpg",
      "/images/Schloss-Freudenstein_Gedeckter-Tisch-fuer-zwei-draussen.jpeg",
      "/images/Schloss-Freudenstein_Gaestin-mit-Badeanzug-am-Pool.jpg",
      "/images/Schloss-Freudenstein_Rennradfahrer.jpg",
      "/images/Schloss-Freudenstein_Kellner-schenkt-Wein-ein.jpg",
      "/images/Schloss-Freudenstein_Gesichtsmassage.jpg",
      "/images/Schloss-Freudenstein_Hochzeitsgesellschaft.jpg",
      "/images/Schloss-Freudenstein_Tortellini-mit-Edamame-Morcheln-und-Sprossen.jpeg",
      "/images/Schloss-Freudenstein_Dessertbuffet-Hochzeit.jpeg",
      "/images/Schloss-Freudenstein_Frau-am-Kalterer-See.jpg"
    ]
  },
  {
    id: 2,
    image: "/images/Hotel Hirschen_Pool.jpg",
    caption: "Design-Hotel mit Spa und Bergblick",
    title: "Hotel Hirschen | Bregenzerwald",
    category: "Wellness & Design in den Alpen",
    location: "Schwarzenberg, Österreich",
    anchorId: "experiences-schwarzenberg",
    travelTime: "2h 15min",
    duration: "3 Tage", 
    minimumStay: "2 Nächte",
    groupSize: "2 Personen",
    price: "1.420€",
    highlights: [
      "Schlafe im preisgekrönten Design-Hotel",
      "Entdecke den schönsten Platz Österreichs",
      "Genieße hawaiianische Lomi Lomi Massage"
    ],
    description: "270 Jahre alte Seele in moderner Hülle. Hier trifft Kunst auf Architektur, Tradition auf Innovation. Umgeben von den weltberühmten Krumbach-Bushaltestellen und dem 'schönsten Platz Österreichs'.",
    details: [
      "2× Übernachtungen im Design-Hotel – Architektur, die richtig Eindruck macht",
      "1× Fermentation Masterclass – Deep Dive in den geheimen Koji-Keller",
      "1× Lomi Lomi Massage – Hawaiianische Vibes mitten im Bregenzerwald",
      "1× Körbersee-Hike – Zum schönsten Spot Österreichs auf 1.600m",
      "1× Architektur-Tour in Krumbach – Die berühmtesten Bushaltestellen Österreichs",
      "1× Vollzugang zum legendären Spa-Bereich",
      "1× 4-Gang Carte Blanche Menü"
    ],
    testimonial: "Endlich mal richtig entspannen können. Die Massage war top, aber die Bushaltestellen-Tour hat mich echt überrascht - sowas hab ich noch nie gesehen.",
    testimonialAuthor: "Max K.",
    mediaMention: "Empfohlen von Michelin Guide und Gault&Millau",
    images: [
      "/images/Hirschen Hotel_Tisch in der Suite.avif",
      "/images/Hirschen Hotel_Schlafzimmer mit Doppelbett.avif",
      "/images/Hirschen Hotel_Badezimmer mit begehbarer Dusche.webp",
      "/images/Hirschen Hotel_Arbeitsplatz im Schlafzimmer.avif",
      "/images/Hirschen Hotel_Hinterhof im Hotel.webp",
      "/images/Hirschen Hotel_Aussenansicht des Hotels.avif",
      "/images/Hotel Hirschen_Frau liest Magazin.jpg",
      "/images/Hirschen Hotel_Unterhaltung unter Freunden am Tisch.webp",
      "/images/Hotel Hirschen_Salat mit Tomaten.jpg",
      "/images/Hirschen Hotel_Yogaraumen mit Matten.webp",
      "/images/Hirschen Hotel_Brombeer Toertchen.jpg"
    ]
  },
  {
    id: 3,
    image: "/images/Prati_Palai_Pool_Sommer.jpg",
    caption: "Gardasee-Dolce Vita mit Olivenhainen",
    title: "Prati Palai | Gardasee",
    category: "La Dolce Vita unter Olivenbäumen",
    location: "Bardolino, Italien",
    anchorId: "experiences-bardolino",
    travelTime: "4h 45min",
    duration: "4 Tage",
    minimumStay: "3 Nächte",
    groupSize: "2 Personen", 
    price: "1.100€",
    originalPrice: "1.180€",
    septemberOffer: true,
    highlights: [
      "Entspanne im Adults-Only Refugium",
      "Schwimme mit Blick auf den Gardasee",
      "Kreiere deinen eigenen Limoncello"
    ],
    description: "Nur acht Zimmer über Bardolinos Dächern. Adults Only – perfekte Ruhe garantiert. Hier gehört ihr zum inneren Kreis derer, die wissen, wo das echte Italien versteckt ist.",
    details: [
      "3× Übernachtungen in der Suite – Adults Only Refugium",
      "3× Italienisches Gourmet-Frühstück – Jeden Morgen ein Dolce Vita-Start",
      "1× Pool-Session mit Seeblick – Einziger Ort in der Umgebung mit solchem Blick",
      "1× Bike-Tour durch Oliven & Zypressen – Insider-Trails rund um Bardolino",
      "1× Limoncello-Workshop – Mix dir deinen eigenen Garden-Drink",
      "1x Candlelight-Dinner auf der Panorama-Terrasse"
    ],
    testimonial: "Der Limoncello-Workshop war fantastisch! Wir haben unseren eigenen Likör gemacht und dabei den ganzen Tag über den Gardasee geschaut. Eine perfekte Auszeit.",
    testimonialAuthor: "Ferdinand L.",
    mediaMention: null,
    images: [
      "/images/Prati_Palai_Suite3.jpg",
      "/images/Prati_Palai_Suite6.jpg",
      "/images/Prati_Palai_Blaue Badewanne.jpg",
      "/images/Prati_Palai_Blick aus dem Fenster.jpg",
      "/images/Prati_Palai_Sonnenuntergang.jpg",
      "/images/Prati_Palai_Apertif auf der Terrasse.jpg",
      "/images/Prati_Palai_Aussenfassade.jpg",
      "/images/Prati_Palai_Pool.jpg",
      "/images/Prati_Palai_Bardolino Hafen.webp",
      "/images/Prati_Palai_Bardolino Innenstadt.webp",
      "/images/Prati_Palai_Weinernte.jpg",
      "/images/Prati_Palai_Weinreben.jpg"
    ]
  },
  {
    id: 4,
    image: "/images/Blaue Gans_Hotelgang.jpg",
    caption: "Kunstgalerie-Hotel in Salzburg",
    title: "Arthotel Blaue Gans | Salzburg",
    category: "Kunst & Kultur im Herzen von Salzburg",
    location: "Salzburg, Österreich",
    anchorId: "experiences-salzburg",
    travelTime: "1h 30min  • 1h 45min ",
    duration: "3 Tage",
    minimumStay: "2 Nächte",
    groupSize: "2 Personen",
    price: "900€",
    highlights: [
      "Schlafe inmitten von Kunstwerken",
      "Koste handgemachte Mozartkugeln",
      "Entdecke die schönsten Flecken in Salzburg"
    ],
    description: "Beuys und Gilbert & George in 700 Jahre alten Mauern. Der Kultur-Hotspot für alle, die ihre Ästhetik ernst nehmen. Hier schlägt das Kunstherz von Mozarts Stadt.",
    details: [
      "2× Übernachtungen mitten in Kunst & Design – Schlafen wie im Atelier",
      "1× Private Kunstführung – Direkt mit Hausherr Andreas, kein Mainstream",
      "1× Mozartkugel-Verkostung – Original bei Fürst",
      "1× Coffee-Ceremony in der Alchemie – Salzburgs coolster Kaffeetempel",
      "1× Sunset-Walk am Kapuzinerberg – Cityviews, die nur Locals kennen",
      "1× Kultur-Abendmenü im hoteleigenen Restaurant"
    ],
    testimonial: "Die Kunstführung war wirklich inspirierend - Andreas kennt sich so gut aus! Und die Mozartkugeln... einfach unwiderstehlich. Salzburg hat uns verzaubert.",
    testimonialAuthor: "Sophie M.",
    mediaMention: null,
    images: [
      "/images/Blaue-Gans_Suite.jpg",
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
    caption: "Alpakas, Wandern und italienische Küche",
    title: "Hotel Rosso | Allgäu",
    category: "Italienisches Flair im Allgäu",
    location: "Altusried, Allgäu",
    anchorId: "experiences-altusried",
    travelTime: "1h 45min",
    duration: "4 Tage", 
    minimumStay: "3 Nächte",
    groupSize: "2 Personen",
    price: "1.400€",
    highlights: [
      "Entspanne in charmant-schicken Apartments",
      "Wandern, biken oder Yoga auf der Sonnenterrasse",
      "Probiere italienisch-bayerische Fusionsküche"
    ],
    description: "Der Hof der unbegrenzten Möglichkeiten. Bodenständigkeit mit italienischem Flair – genau das richtige Maß zwischen authentisch und besonders. Alpenpanorama inklusive.",
    details: [
      "3× Übernachtungen im Boutique-Apartment – Stylish, charmant, entspannt",
      "1× Alpaka-Walk – Fluffy Begleitung inklusive",
      "1× Sunrise-Yoga – Flow mit Alpenpanorama",
      "1× SUP-Session auf der Iller – Natur pur, fast unberührt",
      "1× Hauchenberg-360°-View – Allgäu, aber einmal ganz groß",
      "1× Italienisch-bayerische Fusionsküche – Dinner auf dem Hof"
    ],
    testimonial: "Die Auszeit hier hat uns richtig gut getan - vielen für das tolle Programm, es war alles perfekt.",
    testimonialAuthor: "Thomas R.",
    dogFriendly: true,
    mediaMention: "Empfohlen von Vogue & Condé Nast Traveler",
    images: [
      "/images/Rosso_Doppelbett-mit-Schaukel-und-Kamin.jpg",
      "/images/Rosso_Freistehende-Badewanne.jpg",
      "/images/Rosso_Kueche-mit-Gasherd.jpg",
      "/images/Rosso_Gedeckter-Balkontisch-mit-Limonade.jpg",
      "/images/Rosso_Gedeckter-Tisch-mit-lokalen-Koestlichkeiten.jpg",
      "/images/Rosso_Yoga-Raum-mit-schwarzen-Yogamatten.jpg",
      "/images/Rosso_Holzesstisch-mit-Designerstuehlen.jpg",
      "/images/Rosso_Teich-mit-Unterkunft-im-Hintergrund.jpg",
      "/images/Rosso_Umgebung_Springende-Ziegen-auf-der-gruenen-Wiese.jpg",
      "/images/Rosso_Buch-liegt-auf-Holzfenstersims.jpg",
      "/images/Rosso_Familienaufenthalt.jpg",
      "/images/Rosso_Seitenansicht-auf-Untekrunft-mit-gemuetlicher-Terrasse_Desktop.jpg"
    ]
  },
  {
    id: 6,
    image: "/images/Blyb_Tegernsee Steg.jpg",
    caption: "Gourmet-Erlebnis am Tegernsee",
    title: "Blyb. | Tegernsee",
    category: "Gourmet & Wellness am Tegernsee",
    location: "Gmund, Tegernsee",
    anchorId: "experiences-gmund",
    travelTime: "45min • 1h 15min",
    duration: "3 Tage",
    minimumStay: "2 Nächte",
    groupSize: "2 Personen",
    price: "950€",
    originalPrice: "1.020€",
    septemberOffer: true,
    highlights: [
      "Deine Lifestyle-Adresse am Tegernsee",
      "Genieße Frühstück im Bett und vegetarische Haute Cuisine",
      "Entspanne in der Seeblick-Sauna"
    ],
    description: "Bayerische Tradition, neu interpretiert. Der Ort, an dem sich euer München-Herz zu Hause fühlt – nur schöner. Hier trifft spektakuläre vegetarische Küche auf Bavarian Sashimi.",
    details: [
      "2× Übernachtungen im Design-Refugium – Deine Insider-Adresse am See",
      "2× Veggie-Gourmet-Frühstück – Frühstück im Bett, aber Haute Cuisine",
      "1× 5-Gang-Menü bei Jacques Thull – Veggie, das selbst Fleischesser feiert",
      "1× Bavarian Sashimi Workshop – Pflanzentechnik, die alle überrascht",
      "1× Sauna-Session mit Seeblick – Hot Spot für kalte Tage",
      "1× Hot Tub Genuss - zwischen Garten und See",
      "1× Pizza-Lab – Genieße die beste Pizza aus dem gläsernen Bakery-Haus"
    ],
    testimonial: "Der ideale Ort für eine Slow Escape - ankommen, Stress abwerfen und Entspannungsprogramm starten. Alle Foodies werden diesen Ort lieben!",
    testimonialAuthor: "Anna W.",
    dogFriendly: true,
    mediaMention: null,
    images: [
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

const ExperienceCard = ({ experience, index, isExpanded, onToggle, loadedImages, setLoadedImages }) => {
  // Start with first image (index 0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState(2);
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
  const [dateValidationError, setDateValidationError] = useState('');
  const [dateAdjustmentMessage, setDateAdjustmentMessage] = useState('');

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

  const handleReservationClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Reservation button clicked, opening form...');
    setReservationData(prev => ({ ...prev, guests: selectedGuests }));
    setShowReservationForm(true);
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    
    // Final validation and auto-adjustment before submission
    const validation = validateAndAdjustMinimumStay(reservationData.arrival, reservationData.departure);
    if (!validation.isValid) {
      // Auto-adjust the departure date one more time
      setReservationData(prev => ({
        ...prev,
        departure: validation.adjustedDeparture
      }));
      
      const minStayMatch = experience.minimumStay.match(/(\d+)/);
      const minStayRequired = minStayMatch ? parseInt(minStayMatch[1]) : 1;
      setDateAdjustmentMessage(`Für dieses Erlebnis gilt ein Mindestaufenthalt von ${minStayRequired} Nächten.`);
      return;
    }
    
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
        // Trigger Google Ads conversion event
        if (typeof window !== 'undefined' && typeof window.gtag_report_conversion === 'function') {
          try {
            window.gtag_report_conversion();
            console.log('Conversion event sent successfully');
          } catch (error) {
            console.error('Error sending conversion event:', error);
          }
        } else {
          console.warn('gtag_report_conversion function not available');
        }
        
        setShowSuccessModal(true);
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
        setDateValidationError('');
        setDateAdjustmentMessage('');
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


  // Function to calculate minimum required departure date
  const calculateMinimumDepartureDate = (arrival) => {
    if (!arrival) return null;
    
    const arrivalDate = new Date(arrival);
    const minStayMatch = experience.minimumStay.match(/(\d+)/);
    const minStayRequired = minStayMatch ? parseInt(minStayMatch[1]) : 1;
    
    const minimumDepartureDate = new Date(arrivalDate);
    minimumDepartureDate.setDate(arrivalDate.getDate() + minStayRequired);
    
    return minimumDepartureDate.toISOString().split('T')[0];
  };

  // Function to validate and auto-adjust minimum stay
  const validateAndAdjustMinimumStay = (arrival, departure) => {
    if (!arrival || !departure) return { isValid: true, adjustedDeparture: departure };
    
    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);
    const diffTime = departureDate - arrivalDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Extract minimum stay number from string like "2 Nächte" or "3 Nächte"
    const minStayMatch = experience.minimumStay.match(/(\d+)/);
    const minStayRequired = minStayMatch ? parseInt(minStayMatch[1]) : 1;
    
    if (diffDays >= minStayRequired) {
      return { isValid: true, adjustedDeparture: departure };
    } else {
      // Auto-adjust departure date
      const adjustedDeparture = calculateMinimumDepartureDate(arrival);
      return { isValid: false, adjustedDeparture };
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newData = {
      ...reservationData,
      [name]: type === 'checkbox' ? checked : value
    };
    
    // Always update the reservation data first
    setReservationData(newData);
    
    // Handle date changes with auto-adjustment
    if (name === 'arrival' || name === 'departure') {
      const arrival = name === 'arrival' ? value : newData.arrival;
      const departure = name === 'departure' ? value : newData.departure;
      
      // Only auto-adjust if BOTH dates are selected and stay is too short
      if (arrival && departure) {
        const validation = validateAndAdjustMinimumStay(arrival, departure);
        
        if (!validation.isValid) {
          // Auto-adjust the departure date
          const adjustedData = {
            ...newData,
            departure: validation.adjustedDeparture
          };
          setReservationData(adjustedData);
          
          // Show friendly adjustment message with correct phrasing
          const minStayMatch = experience.minimumStay.match(/(\d+)/);
          const minStayRequired = minStayMatch ? parseInt(minStayMatch[1]) : 1;
          setDateAdjustmentMessage(`Für dieses Erlebnis gilt ein Mindestaufenthalt von ${minStayRequired} Nächten.`);
          setDateValidationError('');
        } else {
          setDateAdjustmentMessage('');
          setDateValidationError('');
        }
      } else {
        // Clear messages when dates are not both selected
        setDateAdjustmentMessage('');
        setDateValidationError('');
      }
    }
  };

  return (
    <motion.div
      id={experience.anchorId}
      className="group cursor-pointer"
      data-card-id={experience.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={() => onToggle(experience.id)}
    >
      {/* Hero Image with Camera Icon */}
      <div className="relative mb-3">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <img 
            src={experience.image} 
            alt={experience.caption}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            onLoad={(e) => {
              e.target.style.opacity = '1';
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Location */}
        <div className="flex items-center space-x-2">
          <div className="text-sm text-sage-600 font-medium">
            {experience.location}
          </div>
          {experience.dogFriendly && (
            <div className="flex items-center space-x-1 bg-sage-100 px-2 py-1 rounded-full">
              <Heart className="w-3 h-3 text-sage-600" />
              <span className="text-xs text-sage-600 font-medium">hundefreundlich</span>
            </div>
          )}
        </div>
        
        {/* Experience Category */}
        <h2 className="text-2xl font-semibold text-gray-900 leading-tight">
          {experience.category}
        </h2>
        
        {/* Divider line */}
        <div className="border-t border-gray-200"></div>
        
        {/* Hotel Name */}
        <h3 className="text-base font-medium text-gray-700 leading-tight">
          {experience.title.split('|')[0].trim()}
        </h3>
        
        {/* 3 Key Highlights */}
        <div className="space-y-2">
          {experience.highlights.map((highlight, index) => (
            <div key={index} className="flex items-start space-x-2 text-sm text-gray-700">
              <div className="w-1.5 h-1.5 bg-coral-400 rounded-full flex-shrink-0 mt-2"></div>
              <span className="leading-relaxed">{highlight}</span>
            </div>
          ))}
        </div>
        
        {/* Travel Time */}
        <div className="flex items-center space-x-2 text-sm text-sage-600 font-medium">
          <Car className="w-4 h-4" />
          <span>Anreise ab München</span>
          <span className="text-gray-400">·</span>
          <span>{experience.travelTime.includes('•') ? experience.travelTime.split('•')[0].trim() : experience.travelTime}</span>
        </div>

        {/* Jetzt entdecken Button */}
        <div className="pt-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggle(experience.id);
            }}
            className="inline-flex items-center text-coral-600 font-medium hover:text-coral-700 transition-all duration-300 relative group pb-1"
          >
            Jetzt entdecken
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-coral-500 to-coral-400 transition-all duration-300 group-hover:from-coral-600 group-hover:to-coral-500"></span>
          </button>
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden expanded-content"
            >
              <div className="space-y-6 pt-6 border-t border-gray-200">
                {/* Description */}
                <div>
                  <p className="text-base text-gray-700 leading-relaxed">{experience.description}</p>
                </div>

                {/* Image Gallery */}
                <div className="space-y-6">
                  <div 
                    className="relative aspect-square overflow-hidden rounded-lg bg-warm-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {!loadedImages.has(experience.images[currentImageIndex]) && (
                      <div className="absolute inset-0 bg-gradient-to-br from-warm-100 to-warm-200 animate-pulse flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-warm-400 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <motion.img 
                      key={currentImageIndex}
                      src={experience.images[currentImageIndex]} 
                      alt={`${experience.title} ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: loadedImages.has(experience.images[currentImageIndex]) ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      onLoad={(e) => {
                        setLoadedImages(prev => new Set([...prev, experience.images[currentImageIndex]]));
                        e.target.style.opacity = '1';
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
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
                    <div 
                      className="flex justify-center space-x-3"
                      onClick={(e) => e.stopPropagation()}
                    >
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


                 {/* Highlights - Redesigned with checkmarks */}
                 <div>
                    <h4 className="text-2xl font-semibold text-gray-900 mb-4">Das erwartet dich</h4>
                   <div className="space-y-3">
                     {experience.details.map((detail, index) => {
                       const [mainPart, description] = detail.split(' – ');
                       return (
                         <div key={index} className="flex items-start space-x-3">
                           <div className="w-5 h-5 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                             <svg className="w-3 h-3 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                             </svg>
                           </div>
                           <div className="text-base text-gray-700 leading-relaxed">
                             <div className="font-semibold text-gray-900">{mainPart}</div>
                             {description && <div className="text-gray-600 mt-1">{description}</div>}
                           </div>
                         </div>
                       );
                     })}
                   </div>
                 </div>

                {/* Duration & Group Size */}
                <div 
                  className="pt-4 border-t border-gray-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  

                   {/* Integrated Pricing Section */}
                   <div className="space-y-4 mb-6">
                     {/* Price Display */}
                     <div className="py-2">
                       <div className="text-2xl font-serif font-semibold text-gray-900">
                         ab €{Math.round(parseInt(experience.price.replace(/[^\d]/g, '')) / 2).toLocaleString('de-DE')} pro Person
                       </div>
                       <div className="text-sm text-sage-600 font-medium mt-1">
                         {experience.septemberOffer ? 'Herbst-Erlebnis' : 'Komplettes Erlebnis'} | {experience.minimumStay}
                       </div>
                       {experience.septemberOffer && (
                         <div className="text-xs text-sage-600 mt-1">
                           Verfügbar bei Buchung im September - Oktober
                         </div>
                       )}
                     </div>

                     {/* Customer Testimonial - Supporting Role */}
                     {experience.testimonial && (
                       <div className="pt-2">
                         <p className="text-sm italic text-gray-900">
                           "{experience.testimonial}"
                         </p>
                         {experience.testimonialAuthor && (
                           <p className="text-xs text-gray-600 mt-1">
                             — {experience.testimonialAuthor}
                           </p>
                         )}
                       </div>
                     )}
                   </div>
                  
                  <div onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={handleReservationClick}
                      className="w-auto px-8 py-3 bg-gradient-to-r from-sage-500 to-sage-600 text-white font-semibold rounded-lg hover:from-sage-600 hover:to-sage-700 transition-all duration-300 shadow-md hover:shadow-lg"
                      type="button"
                    >
                      Erlebnis buchen
                    </button>
                  </div>

                  {/* Media Mention - Below CTA */}
                  {experience.mediaMention && (
                    <div className="mt-4">
                      <p className="text-sm text-sage-600 italic">
                        {experience.mediaMention}
                      </p>
                    </div>
                  )}
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
                    <h3 className="text-xl font-medium text-gray-900">Erlebnis anfragen</h3>
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
                        <span className="text-xs text-sage-600 ml-1">({experience.minimumStay})</span>
                      </label>
                      <input
                        type="date"
                        name="departure"
                        value={reservationData.departure}
                        onChange={handleInputChange}
                        min={reservationData.arrival || new Date().toISOString().split('T')[0]}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-editorial-500 focus:border-editorial-500 ${
                          dateValidationError ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                  </div>
                
                  {/* Date Adjustment Message */}
                  {dateAdjustmentMessage && (
                    <div className="bg-sage-50 border border-sage-200 rounded-lg p-3">
                      <p className="text-sm text-sage-700 font-medium">
                        {dateAdjustmentMessage}
                      </p>
                    </div>
                  )}
                  
                  {/* Date Validation Error (fallback) */}
                  {dateValidationError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-600 font-medium">
                        {dateValidationError}
                      </p>
                    </div>
                  )}

                  {/* Guests */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="w-4 h-4 inline mr-1" />
                      Anzahl Personen
                    </label>
                    <div className="flex justify-start gap-2 flex-wrap">
                      {[1,2,3,4,5,6,7,8].map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => {
                            setReservationData(prev => ({ ...prev, guests: count }));
                            setSelectedGuests(count);
                          }}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            reservationData.guests === count
                              ? 'bg-coral-500 text-white shadow-md'
                              : 'bg-white text-gray-700 hover:bg-coral-50 border border-gray-200'
                          }`}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
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
                      {isSubmitting ? 'Wird gesendet...' : 'Erlebnis anfragen'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowSuccessModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white rounded-2xl p-8 md:p-12 max-w-md w-full shadow-2xl relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-coral-100 rounded-full -translate-y-12 translate-x-12"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-coral-200 rounded-full translate-y-8 -translate-x-8"></div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Success Icon */}
                  <div className="w-20 h-20 bg-gradient-to-br from-coral-400 to-coral-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  {/* Main Message */}
                  <h3 className="text-2xl md:text-3xl font-playfair font-bold text-coral-900 mb-4 leading-tight">
                    🎉 Perfekt! Eure Anfrage ist unterwegs!
                  </h3>
                  
                  <p className="text-lg text-coral-800 mb-6 leading-relaxed">
                    Wir freuen uns riesig auf euch! Unser Team meldet sich in den nächsten 24 Stunden bei euch mit allen Details zu eurem <strong>Erlebnis</strong>.
                  </p>
                  
                  <div className="bg-coral-50 rounded-xl p-4 mb-6 border border-coral-200">
                    <p className="text-sm text-coral-700 font-medium">
                      💌 Checkt euer E-Mail-Postfach – dort findet ihr eine Bestätigung mit allen wichtigen Infos!
                    </p>
                  </div>
                  
                  {/* Action Button */}
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="w-full bg-coral-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-coral-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Verstanden! 🚀
                  </button>
                </div>
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
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Only preload images when cards are expanded
  const preloadImage = (src) => {
    if (loadedImages.has(src)) return;
    
    const img = new Image();
    img.onload = () => {
      setLoadedImages(prev => new Set([...prev, src]));
    };
    img.src = src;
  };

  // Handle hash navigation on component mount
  React.useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.substring(1); // Remove the # symbol
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          // Wait for the component to fully render
          setTimeout(() => {
            targetElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            });
          }, 100);
        }
      }
    };

    // Handle initial hash navigation
    handleHashNavigation();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  // Preload images only for expanded cards
  React.useEffect(() => {
    expandedCards.forEach(cardId => {
      const experience = experiences.find(exp => exp.id === cardId);
      if (experience) {
        // Preload main experience image
        preloadImage(experience.image);
        // Preload first few carousel images
        experience.images.slice(0, 3).forEach(imageSrc => {
          preloadImage(imageSrc);
        });
      }
    });
  }, [expandedCards, preloadImage]);

  const handleToggleCard = (cardId) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      const wasExpanded = newSet.has(cardId);
      
      if (wasExpanded) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
        
        // Scroll to expanded content after animation completes
        setTimeout(() => {
          const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
          if (cardElement) {
            const expandedContent = cardElement.querySelector('.expanded-content');
            if (expandedContent) {
              expandedContent.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
              });
            }
          }
        }, 500); // Wait for expansion animation to complete
      }
      return newSet;
    });
  };

  return (
    <section id="experiences" className="section-padding bg-warm-50 border-b border-warm-200 relative overflow-hidden experiences-showcase">
      
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
            <p className="text-caption">Sofort buchbar</p>
          </div>
          <h2 className="text-section mb-6 text-editorial-900">
            Deine Auszeit diesen Herbst
          </h2>
          <p className="text-body max-w-2xl mx-auto text-editorial-700 mb-8">
            Genieße warme Herbstage und unvergessliche Erlebnisse – bequem mit dem Auto oder Zug ab München.
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
              loadedImages={loadedImages}
              setLoadedImages={setLoadedImages}
            />
          ))}
        </div>
        
        {/* Footer Note */}
      </div>
    </section>
  );
};

export default ExperiencesShowcase;
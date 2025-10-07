import React from 'react';
import { Helmet } from 'react-helmet';

const WochenendtripsMuenchen = () => {
  return (
    <div className="min-h-screen bg-warm-50">
      <Helmet>
        <title>Wochenendtrips ab München | Feschunterwegs - Die Münchner Reiseagentur</title>
        <meta name="description" content="Die besten Wochenendtrips ab München! Handverlesene Kurztrips nach Südtirol, Gardasee, Salzburg & Bayern. Personalisiert ✓ Getestet ✓ Auto/Zug-erreichbar ✓ 24/7 Support" />
        <meta name="keywords" content="wochenendtrips münchen, kurztrips ab münchen, reisebüro münchen, münchen wochenendausflüge, reiseagentur münchen, münchen reisen" />
        <link rel="canonical" href="https://feschunterwegs.com/wochenendtrips-muenchen" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Wochenendtrips ab München | Feschunterwegs" />
        <meta property="og:description" content="Die besten Wochenendtrips ab München! Handverlesene Kurztrips nach Südtirol, Gardasee, Salzburg & Bayern." />
        <meta property="og:url" content="https://feschunterwegs.com/wochenendtrips-muenchen" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "Feschunterwegs - Wochenendtrips München",
            "url": "https://feschunterwegs.com/wochenendtrips-muenchen",
            "description": "Die führende Reiseagentur für Wochenendtrips ab München",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Baaderstraße 25",
              "addressLocality": "München",
              "postalCode": "80469",
              "addressCountry": "DE"
            },
            "areaServed": {
              "@type": "City",
              "name": "München"
            },
            "serviceType": "Wochenendtrips München",
            "keywords": ["Wochenendtrips München", "Kurztrips ab München", "Reisebüro München"]
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Wochenendtrips ab München
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Die besten Wochenendtrips ab München! Wir sind die Münchner Reiseagentur, 
              die jeden versteckten Spot im Umkreis von 400km persönlich getestet hat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/#quiz'}
                className="bg-coral-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-coral-600 transition-colors"
              >
                Quiz starten
              </button>
              <button 
                onClick={() => window.location.href = '/#experiences'}
                className="bg-sage-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-sage-600 transition-colors"
              >
                Herbstangebote sichern
              </button>
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Südtirol ab München</h3>
              <p className="text-gray-600 mb-4">3h 30min mit dem Auto</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Schloss Freudenstein</li>
                <li>• Weinberg-Tour bei Sonnenuntergang</li>
                <li>• Kalterer See Baden</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Gardasee ab München</h3>
              <p className="text-gray-600 mb-4">4h 45min mit dem Auto</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Prati Palai Adults-Only</li>
                <li>• Pool mit Seeblick</li>
                <li>• Limoncello-Workshop</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Salzburg ab München</h3>
              <p className="text-gray-600 mb-4">1h 30min mit dem Zug</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Arthotel Blaue Gans</li>
                <li>• Private Kunstführung</li>
                <li>• Mozartkugel-Verkostung</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Allgäu ab München</h3>
              <p className="text-gray-600 mb-4">1h 45min mit dem Auto</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Hotel Rosso</li>
                <li>• Alpaka-Walk</li>
                <li>• Italienisch-bayerische Küche</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tegernsee ab München</h3>
              <p className="text-gray-600 mb-4">45min mit dem Auto</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Blyb. Design-Refugium</li>
                <li>• Veggie-Gourmet-Frühstück</li>
                <li>• Sauna mit Seeblick</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Bregenzerwald ab München</h3>
              <p className="text-gray-600 mb-4">2h 15min mit dem Auto</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Hotel Hirschen</li>
                <li>• Lomi Lomi Massage</li>
                <li>• Architektur-Tour Krumbach</li>
              </ul>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-lg p-8 shadow-lg mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Warum Feschunterwegs für München Wochenendtrips?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">München-Expertise</h3>
                <p className="text-gray-700 mb-4">
                  Wir sind echte Münchner und kennen jeden versteckten Spot im 400km Umkreis. 
                  Unsere Wochenendtrips sind alle persönlich getestet.
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>✓ Personalisiert in 2 Minuten</li>
                  <li>✓ Alle Hotels persönlich getestet</li>
                  <li>✓ Auto/Zug-erreichbar ab München</li>
                  <li>✓ 24/7 Support</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Lokale Geheimtipps</h3>
                <p className="text-gray-700 mb-4">
                  Wir bringen dich zu Orten, die nur Locals kennen. Keine Touristenfallen, 
                  sondern authentische Erlebnisse.
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>✓ Geheimtipps, die nur Locals kennen</li>
                  <li>✓ Handverlesene Hotels</li>
                  <li>✓ Authentische Erlebnisse</li>
                  <li>✓ Keine Touristenfallen</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Häufige Fragen zu Wochenendtrips ab München
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Welche Wochenendtrips ab München bietet ihr an?
                </h3>
                <p className="text-gray-700">
                  Wir bieten handverlesene Kurztrips nach Südtirol, Gardasee, Salzburg, Allgäu und ganz Bayern. 
                  Alle Ziele sind ab München mit Auto oder Zug erreichbar.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Wie lange dauert die Anreise ab München?
                </h3>
                <p className="text-gray-700">
                  Unsere Wochenendtrips sind alle im 400km Umkreis von München. Die Anreise dauert zwischen 
                  45 Minuten (Tegernsee) und 4h 45min (Gardasee).
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Könnt ihr auch Wochenendtrips ab München mit dem Zug organisieren?
                </h3>
                <p className="text-gray-700">
                  Ja! Viele unserer Ziele sind auch mit dem Zug ab München erreichbar. 
                  Salzburg ist sogar nur 1h 30min mit dem Zug entfernt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WochenendtripsMuenchen;

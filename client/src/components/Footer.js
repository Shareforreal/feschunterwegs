import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  return (
    <footer className="bg-sage-800 text-white section-padding">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-16 mb-16">
          {/* About Section */}
          <div>
            <h3 className="text-section mb-6 text-white">feschunterwegs.</h3>
            <p className="text-body text-white/80 mb-4">
              Die Münchner, die wissen wo's wirklich langgeht.
            </p>
            <p className="text-body text-white/80 mb-4">
              Wir bringen euch zu den Momenten, die ihr euer Leben lang erzählen werdet. Zu versteckten Refugien, wo Zeit stillsteht. Zu Orten, die so perfekt sind, dass ihr euch fragt: Wie haben die das nur gewusst? Während andere noch suchen, seid ihr schon da.
            </p>
          </div>
          
          {/* Contact Section */}
          <div>
            <h3 className="text-section mb-6 text-white">Servus sagen</h3>
            <div className="text-body text-white/80 space-y-4">
              <p className="text-sm text-white/70 mb-4">
                Ihr erreicht uns immer – für die schnelle Frage zwischendurch oder die perfekte Empfehlung.
              </p>
              <div className="space-y-3">
                <p>
                  <a 
                    href="https://wa.me/498912255844" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-300 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.214-.361a9.86 9.86 0 01-1.378-5.031c0-5.449 4.436-9.884 9.884-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.449-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Whatsapp
                  </a>
                </p>
                <p>
                  <button 
                    onClick={() => setShowPhone(!showPhone)}
                    className="hover:text-white transition-colors duration-300 flex items-center gap-2 text-left"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    {showPhone ? (
                      <span className="text-white font-medium">+49 89 12255844</span>
                    ) : (
                      <span>Phone</span>
                    )}
                  </button>
                </p>
                <p>
                  <button 
                    onClick={() => setShowEmail(!showEmail)}
                    className="hover:text-white transition-colors duration-300 flex items-center gap-2 text-left"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    {showEmail ? (
                      <span className="text-white font-medium">servus@feschunterwegs.com</span>
                    ) : (
                      <span>Mail</span>
                    )}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-sage-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img 
                src="/images/Branding/Feschunterwegs_Logo_Coral.png" 
                alt="Feschunterwegs" 
                className="h-6"
              />
              <p className="text-sm text-white/60">
                &copy; 2025 Feschunterwegs. Handmade in München.
              </p>
            </div>
            <div className="flex space-x-8">
              <Link 
                to="/impressum"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Impressum
              </Link>
              <Link 
                to="/datenschutz"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Datenschutz
              </Link>
              <Link 
                to="/agb"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                AGB
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
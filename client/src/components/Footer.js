import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

  return (
    <footer className="bg-sage-800 text-white section-padding">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          {/* About Section */}
          <div>
            <h3 className="text-section mb-6 text-white">feschunterwegs.</h3>
            <p className="text-body text-white/80 mb-4">
              Die Münchner, die immer wissen wo's langgeht.
            </p>
            <p className="text-body text-white/80 mb-4">
            Wir bringen euch zu Orten, von denen ihr nicht wusstet, dass ihr sie sucht. Verstehen, dass Zeit euer wertvollstes Gut ist. Und verschwenden sie niemals.
            </p>
          </div>
          
          {/* Contact Section */}
          <div className="md:text-right">
            <h3 className="text-section mb-6 text-white">Kontakt</h3>
            <div className="text-body text-white/80 space-y-3">
              <p>+49 89 47502228</p>
              <p>servus@feschunterwegs.com</p>
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
import React from 'react';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';

const Footer = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer data-testid="footer" className="border-t border-[var(--ds-border)] pt-12 pb-6 md:pt-16 md:pb-8 px-4 md:px-4 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8 md:mb-12">
          {/* Branding Column */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/Dream Shoots Logo FOOTER (1).png"
                alt="Dream Shoots"
                className="h-24 md:h-28 w-auto"
              />
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col items-start md:items-start space-y-6">
            <h4 className="text-sm font-bold tracking-widest uppercase mb-2">Quick Links</h4>
            <div className="flex flex-col items-start md:items-start space-y-4">
              {[
                { label: 'About Us', id: 'about' },
                { label: 'Pricing', id: 'pricing' },
                { label: 'Locations', id: 'locations' },
                { label: 'Book a Shoot', id: 'contact' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-gray-500 hover:text-white transition-colors text-xs font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Locations Column */}
          <div className="flex flex-col items-start md:items-start space-y-6">
            <h4 className="text-sm font-bold tracking-widest uppercase mb-2">Locations</h4>
            <div className="flex flex-col items-start md:items-start space-y-4">
              {['Nellore', 'Hyderabad', 'Vijayawada', 'Ongole', 'Tirupati'].map((city) => (
                <div key={city} className="flex items-center gap-3 text-gray-500 text-xs font-medium">
                  <MapPin size={14} className="text-red-600 fill-red-600/20" />
                  {city}
                </div>
              ))}
            </div>
          </div>

          {/* Get in Touch Column */}
          <div className="flex flex-col items-start md:items-start space-y-6">
            <h4 className="text-sm font-bold tracking-widest uppercase mb-2">Get in Touch</h4>
            <div className="flex flex-col items-start md:items-start space-y-4">
              <a href="tel:+917330858705" className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors text-xs font-medium">
                <Phone size={14} className="text-red-600 fill-red-600/20" />
                +91 73308 58705
              </a>
              <a href="mailto:dreamshootsofficial@gmail.com" className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors text-xs font-medium">
                <Mail size={14} className="text-red-600 fill-red-600/20" />
                dreamshootsofficial@gmail.com
              </a>
              <a href="https://instagram.com/dreamshootsofficial" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors text-xs font-medium">
                <Instagram size={14} className="text-red-600 fill-red-600/20" />
                @dreamshootsofficial
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--ds-border)] pt-4 md:pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-[10px] md:text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Dream Shoots. All rights reserved.
          </p>
          <div className="flex items-center justify-center">
            <a
              href="https://tzynstudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-all hover:scale-110 active:scale-95"
            >
              <img
                src="/Imagined and Crafted by TZYN final (1).png"
                alt="TZYN Studio"
                className="h-10 md:h-12 w-auto grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100"
              />
            </a>
          </div>
          <p className="text-gray-500 text-[10px] md:text-xs text-center">
            Capturing your moments.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

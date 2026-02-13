import React from 'react';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';

const Footer = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer data-testid="footer" className="bg-black text-white py-16 px-4 border-t border-[var(--ds-border)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Branding Column */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div className="flex items-center gap-2">
            <img
              src="/Dream Shoots Logo.svg"
              alt="Dream Shoots"
              className="h-16 w-auto"
            />
          </div>
          <div className="flex items-center gap-4 w-full">
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-red-600 to-red-600"></div>
            <span className="text-[10px] tracking-[0.2em] font-bold text-red-600 whitespace-nowrap uppercase">
              Turning Moments into Memories
            </span>
            <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent via-red-600 to-red-600"></div>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col space-y-6">
          <h4 className="text-sm font-bold tracking-widest uppercase mb-2">Quick Links</h4>
          <div className="flex flex-col space-y-4">
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
        <div className="flex flex-col space-y-6">
          <h4 className="text-sm font-bold tracking-widest uppercase mb-2">Locations</h4>
          <div className="flex flex-col space-y-4">
            {['Nellore', 'Hyderabad', 'Vijayawada', 'Ongole', 'Tirupati'].map((city) => (
              <div key={city} className="flex items-center gap-3 text-gray-500 text-xs font-medium">
                <MapPin size={14} className="text-red-600 fill-red-600/20" />
                {city}
              </div>
            ))}
          </div>
        </div>

        {/* Get in Touch Column */}
        <div className="flex flex-col space-y-6">
          <h4 className="text-sm font-bold tracking-widest uppercase mb-2">Get in Touch</h4>
          <div className="flex flex-col space-y-4">
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

      {/* Bottom bar with TZYN logo */}
      <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-gray-600 text-[10px] tracking-wider uppercase">
          &copy; {new Date().getFullYear()} Dream Shoots. All rights reserved.
        </p>
        <a
          href="https://tzynstudio.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-40 hover:opacity-100 transition-opacity"
        >
          <img
            src="/Imagined and Crafted by TZYN final (1).png"
            alt="Crafted by TZYN"
            className="h-8 w-auto grayscale"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-8 md:mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl md:text-2xl font-bold text-[var(--ds-red)] mb-3 md:mb-4">Dream Shoots</div>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Fast shoots. Faster delivery. Professional content created by trained creators.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-white font-bold text-xs md:text-sm tracking-wider uppercase mb-3 md:mb-4">Quick Links</h4>
            <div className="space-y-2 md:space-y-3">
              {[
                { label: 'About Us', id: 'about' },
                { label: 'Pricing', id: 'pricing' },
                { label: 'Locations', id: 'locations' },
                { label: 'Book a Shoot', id: 'contact' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="footer-link block text-gray-400 hover:text-[var(--ds-red)] transition-colors text-xs md:text-sm"
                  data-testid={`footer-link-${link.id}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div className="col-span-1">
            <h4 className="text-white font-bold text-xs md:text-sm tracking-wider uppercase mb-3 md:mb-4">Locations</h4>
            <div className="space-y-2 md:space-y-3">
              {['Nellore', 'Hyderabad', 'Vijayawada', 'Ongole', 'Tirupati'].map((city) => (
                <div key={city} className="flex items-center gap-2 text-gray-400 text-xs md:text-sm hover:text-[var(--ds-red)] transition-colors">
                  <MapPin size={12} className="text-[var(--ds-red)] flex-shrink-0 hidden md:block" />
                  <MapPin size={10} className="text-[var(--ds-red)] flex-shrink-0 md:hidden" />
                  {city}
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-bold text-xs md:text-sm tracking-wider uppercase mb-3 md:mb-4">Get in Touch</h4>
            <div className="space-y-2 md:space-y-3">
              <a href="tel:+917330858705" className="flex items-center gap-2 text-gray-400 hover:text-[var(--ds-red)] transition-colors footer-link text-xs md:text-sm">
                <Phone size={12} className="text-[var(--ds-red)] hidden md:block" />
                <Phone size={10} className="text-[var(--ds-red)] md:hidden" />
                <span className="truncate">+91 73308 58705</span>
              </a>
              <a href="mailto:dreamshootsofficial@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-[var(--ds-red)] transition-colors footer-link text-xs md:text-sm">
                <Mail size={12} className="text-[var(--ds-red)] hidden md:block" />
                <Mail size={10} className="text-[var(--ds-red)] md:hidden" />
                <span className="truncate">dreamshots@gmail.com</span>
              </a>
              <a href="https://instagram.com/dreamshootsofficial" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-[var(--ds-red)] transition-colors footer-link text-xs md:text-sm">
                <Instagram size={12} className="text-[var(--ds-red)] hidden md:block" />
                <Instagram size={10} className="text-[var(--ds-red)] md:hidden" />
                <span className="truncate">@dreamshots</span>
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

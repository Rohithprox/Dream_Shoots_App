import React, { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'navbar border-b border-[#1a1a1a]' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div
          data-testid="navbar-logo"
          className="cursor-pointer flex-shrink-0"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/dreamshoots-logo.png"
            alt="Dream Shoots"
            className="h-14 md:h-16 w-auto block"
          />
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['About', 'Pricing', 'Locations', 'Contact'].map((item) => (
            <button
              key={item}
              data-testid={`nav-${item.toLowerCase()}`}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-sm text-gray-400 hover:text-white transition-colors font-medium tracking-wide"
            >
              {item}
            </button>
          ))}
          <button
            data-testid="nav-book-a-shoot"
            onClick={() => scrollTo('contact')}
            className="bg-[var(--ds-red)] hover:bg-[var(--ds-red-dark)] text-white text-xs font-bold px-5 py-2.5 rounded-md transition-all tracking-widest uppercase"
          >
            Book a Shoot
          </button>
        </div>

        <button
          data-testid="mobile-menu-toggle"
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden navbar border-t border-[#1a1a1a] px-6 py-4 space-y-3">
          {['About', 'Pricing', 'Locations', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="block w-full text-left text-gray-300 hover:text-white py-2 font-medium"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="btn-red w-full text-center justify-center text-xs py-3"
          >
            Book a Shoot
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

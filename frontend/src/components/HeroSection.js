import React from 'react';
import { Zap, Camera } from 'lucide-react';

const HeroSection = () => {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section data-testid="hero-section" className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Background red glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--ds-red)] opacity-[0.06] blur-[120px] rounded-full pointer-events-none" />

      {/* Badge */}
      <div
        data-testid="hero-badge"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--ds-red)] text-[var(--ds-red)] mb-10"
        style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '2px', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase' }}
      >
        <Zap size={16} fill="currentColor" /> Fast Shoots &bull; Faster Delivery
      </div>

      {/* Heading */}
      <h1 className="hero-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] mb-8">
        <span className="block text-white">FAST CONTENT</span>
        <span className="text-red-600 block mb-2 animate-pulse-glow">REAL CREATORS</span>
        <span className="block text-white">DELIVERED QUICKLY</span>
      </h1>

      {/* Subtitle */}
      <p data-testid="hero-subtitle" className="text-gray-300 text-base md:text-lg font-medium mb-3 max-w-2xl">
        Trusted by growing brands, events, and creators across India
      </p>
      <p className="text-gray-500 text-sm md:text-base mb-10 max-w-2xl">
        Get professional short-form videos, event coverage, and brand content — created by trained creators and delivered fast.
      </p>

      {/* CTA */}
      <button
        data-testid="hero-book-now-btn"
        onClick={scrollToContact}
        className="btn-red text-lg px-10 py-4 rounded-lg"
      >
        <Camera size={20} /> BOOK NOW
      </button>
    </section>
  );
};

export default HeroSection;

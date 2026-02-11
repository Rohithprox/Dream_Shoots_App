import React from 'react';
import { Users, Camera, DollarSign, FolderOpen, TrendingUp } from 'lucide-react';

const creatorFeatures = [
  { icon: <Users size={20} />, title: 'Join Our Network', desc: 'Connect with brands and businesses looking for talented creators' },
  { icon: <Camera size={20} />, title: 'Professional Shoots', desc: 'Handle shooting and editing with professional standards' },
  { icon: <DollarSign size={20} />, title: 'Earn Consistently', desc: 'Get paid for your creative work and build a stable income' },
  { icon: <FolderOpen size={20} />, title: 'Grow Your Portfolio', desc: 'Build an impressive portfolio with diverse projects' },
];

const CreatorsSection = () => {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section data-testid="creators-section" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <span className="inline-block px-5 py-2 rounded-full border border-[var(--ds-red)] text-[var(--ds-red)] text-xs font-semibold tracking-widest uppercase">
            For Creators
          </span>
        </div>
        <h2 className="section-heading text-center text-4xl md:text-5xl mb-4">
          Create Earn Grow <span className="text-[var(--ds-red)]" style={{ fontStyle: 'italic' }}>with Dream Shoots</span>
        </h2>
        <p className="text-center text-gray-400 mb-14 text-base">
          Dream Shoots helps creators earn and grow their audience:
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - features */}
          <div>
            <div className="space-y-2">
              {creatorFeatures.map((f, i) => (
                <div
                  key={i}
                  data-testid={`creator-feature-${i}`}
                  className="about-feature-item"
                >
                  <div className="about-feature-icon">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1">{f.title}</h4>
                    <p className="text-gray-400 text-sm">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pl-5">
              <button
                data-testid="apply-as-creator-btn"
                onClick={scrollToContact}
                className="btn-red text-sm"
              >
                Apply as a Creator
              </button>
            </div>
          </div>

          {/* Right - stats cards */}
          <div className="space-y-6">
            {/* Creator stats card */}
            <div className="bg-[var(--ds-card)] border border-[var(--ds-border)] rounded-xl p-6">
              <p className="text-gray-400 text-xs mb-4 tracking-wide uppercase">Creator with camera &bull; Professional equipment</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4 text-center border border-[var(--ds-border)]">
                  <div className="text-[var(--ds-red)] text-3xl font-bold" style={{ fontFamily: "'Oswald', sans-serif" }}>500+</div>
                  <div className="text-gray-400 text-xs mt-1">Active Creators</div>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4 text-center border border-[var(--ds-border)]">
                  <div className="text-[var(--ds-red)] text-3xl font-bold" style={{ fontFamily: "'Oswald', sans-serif" }}>1000+</div>
                  <div className="text-gray-400 text-xs mt-1">Projects Done</div>
                </div>
              </div>
            </div>

            {/* Business card */}
            <div className="bg-[var(--ds-card)] border border-[var(--ds-border)] rounded-xl p-6">
              <h4 className="text-white font-semibold mb-3">Business / Brand / Event</h4>
              <div className="flex justify-between items-center py-2 border-b border-[var(--ds-border)]">
                <span className="text-gray-400 text-sm">Project Match</span>
                <span className="text-[var(--ds-red)] font-bold">95%</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-400 text-sm">Quick Delivery</span>
                <span className="text-[var(--ds-red)] font-bold">Fast</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorsSection;

import React from 'react';
import { Zap, Award, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Zap size={28} />,
    title: 'LIGHTNING FAST',
    desc: 'Short-form videos and event coverage created by trained creators — no delays, no hassle.',
  },
  {
    icon: <Award size={28} />,
    title: 'TOP QUALITY',
    desc: 'Trusted by brands for fast turnaround, consistent quality, and smooth content creation.',
  },
  {
    icon: <Sparkles size={28} />,
    title: 'ZERO DELAYS',
    desc: 'Professional content delivered at lightning speed. No waiting, just results.',
  },
];

const FeaturesSection = () => {
  return (
    <section data-testid="features-section" className="py-20 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            data-testid={`feature-card-${i}`}
            className="feature-card bg-[var(--ds-card)] border border-[var(--ds-border)] rounded-xl p-8 text-center"
          >
            <div className="text-[var(--ds-red)] flex justify-center mb-5">
              {f.icon}
            </div>
            <h3
              className="text-white font-bold text-lg mb-3"
              style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '1.5px' }}
            >
              {f.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;

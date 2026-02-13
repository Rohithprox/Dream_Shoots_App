import React from 'react';
import { Zap, Target, TrendingUp, BarChart3 } from 'lucide-react';

const aboutFeatures = [
  { icon: <BarChart3 size={22} />, title: 'LIGHTNING FAST', desc: 'Quick turnaround times without compromising on quality' },
  { icon: <Target size={22} />, title: 'PRECISION FOCUSED', desc: 'Trained creators who understand your vision' },
  { icon: <TrendingUp size={22} />, title: 'GROWTH ORIENTED', desc: 'Content that drives engagement and results' },
];

const AboutSection = () => {
  return (
    <section id="about" data-testid="about-section" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="text-center mb-4">
          <span
            className="inline-block px-5 py-2 rounded-full border border-[var(--ds-red)] text-[var(--ds-red)] text-xs font-semibold tracking-widest uppercase"
          >
            About Us
          </span>
        </div>
        <h2 className="section-heading text-center text-4xl md:text-5xl mb-16">
          About <span className="text-[var(--ds-red)] font-bold" style={{ fontStyle: 'italic' }}>DREAM SHOOTS</span>
        </h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16 text-base">
          Dream Shoots helps businesses create quality content quickly by connecting them with trained creators. Built for speed, simplicity, and reliability.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - feature list */}
          <div className="bg-[var(--ds-card)] border border-[var(--ds-border)] rounded-xl overflow-hidden">
            {aboutFeatures.map((f, i) => (
              <div
                key={i}
                data-testid={`about-feature-${i}`}
                className="about-feature-item border-b border-[var(--ds-border)] last:border-b-0"
              >
                <div className="about-feature-icon">
                  {f.icon}
                </div>
                <div>
                  <h4
                    className="text-white font-bold text-sm mb-1"
                    style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '1px' }}
                  >
                    {f.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right - text content */}
          <div>
            <h3
              className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '1px' }}
            >
              CONTENT CREATION, <span className="text-[var(--ds-red)]" style={{ fontStyle: 'italic' }}>WITHOUT THE DELAYS</span>
            </h3>
            <p className="text-gray-400 text-base mb-6 leading-relaxed">
              We understand the challenges businesses face in creating high-quality content consistently. That's why we've built a platform that eliminates the usual bottlenecks in content production.
            </p>
            <p className="text-gray-400 text-base mb-8 leading-relaxed">
              Our network of trained creators is ready to bring your vision to life. From concept to delivery, we handle everything so you can focus on what matters most - growing your brand.
            </p>
            <button
              data-testid="read-our-story-btn"
              className="btn-red text-sm"
              onClick={() => { }}
            >
              <Zap size={16} fill="white" /> READ OUR STORY
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
